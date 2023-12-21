import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const User = z
  .object({
    page: z.string().refine((value) => {
      // Check if the value is not a number
      if (isNaN(Number(value))) {
        // Throw an error with a custom message
        throw new Error('Must be a valid number');
      }
      // Return true if the value is a number
      return true;
    }),
    perPage: z.string().refine((value) => {
      // Check if the value is not a number
      const isNan = isNaN(Number(value));
      if (isNan) {
        // Throw an error with a custom message
        throw new Error('Must be a valid number');
      } else if (Number(value) > 10 || Number(value) < 0) {
        throw new Error('Perpage must be an number between 0 and 10');
      }
      // Return true if the value is a number
      return true;
    }),
    orderBy: z.string(),
  })
  .openapi('User');
