import { Request, Route } from 'tsoa';

import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UploadedFile,
  Delete,
  Query,
} from '@nestjs/common';
import { UserType } from '@prisma/client';
import { subject } from '@casl/ability';
import { ApiConsumes } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Roles } from '../auth/auth-utils/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { TokenData } from '../auth/auth-utils/types-auth';
import { UpdateUserWithAvatarDto } from '../auth/dto/update-user.dto';
import { JwtUser } from '../auth/auth-utils/user.decorator';

import { CaslForbiddenError } from '../utils/casl/casl-forbidden-error.decorator';
import { CaslForbiddenErrorI } from '../utils/casl/casl-rules.factory';
import { PaginatorDto } from '../utils/paginators.ts/dto/paginator.normal.dto';

@Route('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Roles(UserType.ADMIN)
  @Get('/admin/all')
  findAll(@Request() @Query() paginatorDto: PaginatorDto) {
    return this.userService.findAll(paginatorDto);
  }

  @Get('me')
  async findMyProfile(@Request() @JwtUser() tokenData: TokenData) {
    const user = await this.userService.findById(tokenData.id);
    return user;
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  async update(
    @Request() @Param('id') id: string,
    @Request() @Body() updateUserDto: UpdateUserWithAvatarDto,
    @Request() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
    @Request() @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.authService.findById(id);

    forbiddenError.throwUnlessCan('update', subject('AuthUser', user));

    return this.userService.update(id, updateUserDto, user.user.avatar);
  }

  @Delete(':id')
  async remove(
    @Request() @Param('id') id: string,
    @Request() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ): Promise<void> {
    const authUser = await this.authService.findTypeById(id);

    forbiddenError.throwUnlessCan('delete', subject('AuthUser', authUser));

    return this.userService.remove(id);
  }
}
