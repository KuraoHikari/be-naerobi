import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { BookmarkService } from './bookmark.service';
import { Sorting, SortingParams } from 'src/lib/sortingParam';
import { Filtering, FilteringParams } from 'src/lib/filterParam';
import { Pagination, PaginationParams } from 'src/lib/paginationParam';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  getBookmark(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['createdAt', 'id', 'updatedAt', 'arrivedAt', 'code'])
    sort?: Sorting,
    @FilteringParams([
      'wharehouse',
      'code',
      'name',
      'destination',
      'ownerName',
      'companyName',
    ])
    filter?: Filtering,
  ) {
    return this.bookmarkService.bookmarkFindMany({
      where: filter,
      orderBy: sort,
      page: {
        page: paginationParams.page,
        perPage: paginationParams.size,
      },
    });
  }
}
