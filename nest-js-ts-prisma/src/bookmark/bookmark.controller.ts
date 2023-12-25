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
import { BookmarkParamId } from './dto/bookmark.dto';

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

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getBookmarkById(
    @GetCurrentUserId() userId: number,
    @Param() { id }: BookmarkParamId,
  ) {
    return { id };
  }
}
