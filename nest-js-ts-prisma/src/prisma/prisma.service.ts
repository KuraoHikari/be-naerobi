import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import {
  AuthorizeOption,
  FindOneWithAuthFunction,
  PaginateFunction,
  PaginateOptions,
} from './dto/prismaCustom.dto';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    // teardown logic
    return Promise.all([this.user.deleteMany()]);
  }

  paginator(defaultOptions: PaginateOptions): PaginateFunction {
    return async (model, args: any = { where: undefined }, options) => {
      const page = Number(options?.page || defaultOptions?.page) || 1;
      const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;

      const skip = page > 0 ? perPage * (page - 1) : 0;
      const [total, data] = await Promise.all([
        model.count({ where: args.where }),
        model.findMany({
          ...args,
          take: perPage,
          skip,
        }),
      ]);
      const lastPage = Math.ceil(total / perPage);

      return {
        data,
        meta: {
          total,
          lastPage,
          currentPage: page,
          perPage,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
      };
    };
  }

  findOneWithAuth = (auth: AuthorizeOption): FindOneWithAuthFunction => {
    if (!auth || auth.userId) {
      throw new ForbiddenException('Access to resources denied222');
    }

    return async (model, args: any = { where: undefined }) => {
      const data = await model.findUnique({
        ...args,
      });

      if (!data || data.userId !== auth.userId) {
        throw new ForbiddenException('Access to resources denied');
      }

      return {
        data,
      };
    };
  };
}
