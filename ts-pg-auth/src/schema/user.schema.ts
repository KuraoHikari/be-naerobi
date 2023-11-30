import { TypeOf, object, string, z } from "zod";

enum RoleEnumType {
 ADMIN = "admin",
 USER = "user",
}

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Unique identifier for the user
 *          example: "35681813-8ad3-476d-99f2-56d5f5647127"
 *        name:
 *          type: string
 *          description: Name of the user
 *          example: "Nama Pengguna"
 *        email:
 *          type: string
 *          format: email
 *          description: Email address of the user
 *          example: "hgvfq3cdphtssomv@ethereal.email"
 *        photo:
 *          type: string
 *          description: User's profile photo
 *          example: "default.png"
 *        role:
 *          type: string
 *          description: Role of the user
 *          example: "user"
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Date and time when the user was created
 *          example: "2023-11-28T09:09:47.319Z"
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: Date and time when the user was last updated
 *          example: "2023-11-30T06:51:08.729Z"
 *        provider:
 *          type: string
 *          nullable: true
 *          description: User's provider information
 *          example: null
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirm
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirm:
 *          type: string
 *          default: stringPassword123
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 */
export const registerUserSchema = object({
 body: object({
  name: string({
   required_error: "Name is required",
  }),
  email: string({
   required_error: "Email address is required",
  }).email("Invalid email address"),
  password: string({
   required_error: "Password is required",
  })
   .min(8, "Password must be more than 8 characters")
   .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({
   required_error: "Please confirm your password",
  }),
  role: z.optional(z.nativeEnum(RoleEnumType)),
 }).refine(
  (data) => data.password === data.passwordConfirm,
  {
   path: ["passwordConfirm"],
   message: "Passwords do not match",
  }
 ),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        access_token:
 *          type: string
 */
export const loginUserSchema = object({
 body: object({
  email: string({
   required_error: "Email address is required",
  }).email("Invalid email address"),
  password: string({
   required_error: "Password is required",
  }).min(8, "Invalid email or password"),
 }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    VerifyEmailResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        access_token:
 *          type: string
 */
export const verifyEmailSchema = object({
 params: object({
  verificationCode: string(),
 }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *    ForgotPasswordResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 */
export const forgotPasswordSchema = object({
 body: object({
  email: string({
   required_error: "Email is required",
  }).email("Email is invalid"),
 }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    ResetPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirm
 *      properties:
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirm:
 *          type: string
 *          default: stringPassword123
 *    ResetPasswordResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 */
export const resetPasswordSchema = object({
 params: object({
  resetToken: string(),
 }),
 body: object({
  password: string({
   required_error: "Password is required",
  }).min(8, "Password must be more than 8 characters"),
  passwordConfirm: string({
   required_error: "Please confirm your password",
  }),
 }).refine(
  (data) => data.password === data.passwordConfirm,
  {
   message: "Passwords do not match",
   path: ["passwordConfirm"],
  }
 ),
});
export const updateUserSchema = object({
 body: object({
  name: string({}),
  email: string({}).email("Invalid email address"),
  password: string({})
   .min(8, "Password must be more than 8 characters")
   .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({}),
  role: z.optional(z.nativeEnum(RoleEnumType)),
 })
  .partial()
  .refine(
   (data) => data.password === data.passwordConfirm,
   {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
   }
  ),
});

export type RegisterUserInput = Omit<
 TypeOf<typeof registerUserSchema>["body"],
 "passwordConfirm"
>;
export type LoginUserInput = TypeOf<
 typeof loginUserSchema
>["body"];
export type VerifyEmailInput = TypeOf<
 typeof verifyEmailSchema
>["params"];
export type UpdateUserInput = TypeOf<
 typeof updateUserSchema
>["body"];

export type ForgotPasswordInput = TypeOf<
 typeof forgotPasswordSchema
>["body"];
export type ResetPasswordInput = TypeOf<
 typeof resetPasswordSchema
>;
