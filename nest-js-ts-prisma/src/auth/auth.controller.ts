import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginUserDto, LoginUserResponseDto, RegisterUserDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({
    type: LoginUserResponseDto,
  })
  signup(@Body() registerUserDto: RegisterUserDto): Promise<Tokens> {
    return this.authService.signup(registerUserDto);
  }

  @Post('signin')
  @ApiOkResponse({
    type: LoginUserResponseDto,
  })
  signin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signin(loginUserDto);
  }

  //   @Post('/logout')
  //   logout() {
  //     return this.authService.logout();
  //   }

  //   @Post('/refresh')
  //   refreshToken() {
  //     return this.authService.refreshToken();
  //   }
}
