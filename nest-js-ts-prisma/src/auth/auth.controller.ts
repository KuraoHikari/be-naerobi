import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto, LoginUserResponseDto, RegisterUserDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RtGuard } from '../common/guards';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  @ApiOkResponse({
    type: LoginUserResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() registerUserDto: RegisterUserDto): Promise<Tokens> {
    return this.authService.signup(registerUserDto);
  }

  @Public()
  @Post('/signin')
  @ApiOkResponse({
    type: LoginUserResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  signin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signin(loginUserDto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
