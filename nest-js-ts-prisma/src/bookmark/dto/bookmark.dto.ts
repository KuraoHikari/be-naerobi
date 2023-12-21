import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { title } from 'process';
import { z } from 'zod';

export const Bookmark = z
  .object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    title: z.string(),
    description: z.string(),
    link: z.string(),
    userId: z.string(),
  })
  .openapi('Bookmark');

export class CreateBookmarkDto extends createZodDto(
  Bookmark.omit({ id: true, updatedAt: true, createdAt: true, userId: true }),
) {}

export class UpdateBookmarkDto extends createZodDto(
  Bookmark.omit({ id: true, updatedAt: true, createdAt: true, userId: true }),
) {}
