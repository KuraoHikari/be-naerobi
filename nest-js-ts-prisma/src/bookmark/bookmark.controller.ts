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
  constructor(private authService: BookmarkService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  logout(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'id', 'stateId']) sort?: Sorting,
    @FilteringParams(['name', 'id', 'stateId']) filter?: Filtering,
  ) {
    return { paginationParams, sort, filter };
  }
}
