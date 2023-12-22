import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Bookmark, Prisma } from '@prisma/client';
import {
  PaginateFunction,
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '../lib/paginator';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async bookmarkFindMany({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.BookmarkWhereInput;
    orderBy?: Prisma.BookmarkOrderByWithRelationInput;
    page?: PaginateOptions;
  }): Promise<PaginatedResult<Bookmark>> {
    return paginate(
      this.prisma.bookmark,
      {
        where,
        orderBy,
      },
      page,
    );
  }
}
