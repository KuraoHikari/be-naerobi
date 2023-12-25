import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@wahyubucil/nestjs-zod-openapi';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './common/guards';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
