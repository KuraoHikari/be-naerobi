import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const User = z
  .object({
    email: z.string().email().openapi({ description: 'User valid email' }),
    password: z
      .string()
      .min(6, 'Password is too short')
      .openapi({ description: 'Display name of the user' }),
    firstName: z.string().min(1, 'Value is too short'),
    lastName: z.string().min(1, 'Value is too short'),
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

export class RegisterUserDto extends createZodDto(
  User.extend({
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }),
) {}

export class LoginUserResponseDto extends createZodDto(LoginUserResponse) {}
export class RegisterUserResponseDto extends createZodDto(
  LoginUserResponse.omit({ access_token: true }),
) {}
