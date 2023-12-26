import { Injectable } from '@nestjs/common';

import { Bookmark, Prisma } from '@prisma/client';
import {
  FindOneWithAuthResult,
  PaginateOptions,
  PaginatedResult,
} from 'src/prisma/dto/prismaCustom.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async findMany({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.BookmarkWhereInput;
    orderBy?: Prisma.BookmarkOrderByWithRelationAndSearchRelevanceInput;
    page?: PaginateOptions;
  }): Promise<PaginatedResult<Bookmark>> {
    return this.prisma.paginator({ perPage: 10 })(
      this.prisma.bookmark,
      {
        where,
        orderBy,
      },
      page,
    );
  }

  async findById({
    userId,
    where,
  }: {
    userId: string;
    where: Prisma.BookmarkWhereInput;
  }): Promise<FindOneWithAuthResult<Bookmark>> {
    return this.prisma.findOneWithAuth({ userId })(this.prisma.bookmark, where);
  }
}
