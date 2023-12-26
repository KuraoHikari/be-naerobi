import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Sorting, SortingParams } from 'src/lib/sortingParam';
import { Filtering, FilteringParams } from 'src/lib/filterParam';
import { Pagination, PaginationParams } from 'src/lib/paginationParam';
import { GetCurrentUserId, Public } from 'src/common/decorators';

import { BookmarkParamId } from './dto/bookmark.dto';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getBookmark(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['createdAt', 'updatedAt', 'title'])
    sort?: Sorting,
    @FilteringParams(['title', 'description', 'link', 'id'])
    filter?: Filtering,
  ) {
    return this.bookmarkService.findMany({
      where: filter,
      orderBy: sort,
      page: {
        page: paginationParams.page,
        perPage: paginationParams.size,
      },
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getBookmarkById(
    @GetCurrentUserId() userId: string,
    @Param() { id }: BookmarkParamId,
  ) {
    return this.bookmarkService.findById({ userId, where: { id } });
  }
}
