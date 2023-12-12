import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const User = z
  .object({
    email: z.string().openapi({ description: 'User valid email' }),
    password: z.string().openapi({ description: 'Display name of the user' }),
    firstName: z.string(),
    lastName: z.string(),
  })
  .openapi('User');

export const LoginUserResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  access_token: z.string(),
});

export class LoginUserDto extends createZodDto(
  User.omit({ firstName: true, lastName: true }),
) {}

export class RegisterUserDto extends createZodDto(User) {}

export class LoginUserResponseDto extends createZodDto(LoginUserResponse) {}
export class RegisterUserResponseDto extends createZodDto(
  LoginUserResponse.omit({ access_token: true }),
) {}
