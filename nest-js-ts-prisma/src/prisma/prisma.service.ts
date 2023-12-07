import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://admin:password123@127.0.0.1:6500/dev-db?schema=public',
        },
      },
    });
  }
}
