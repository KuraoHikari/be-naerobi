import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  [x: string]: string;
}

export const SortingParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): Sorting[] => {
    const req: Request = ctx.switchToHttp().getRequest();

    const sort = req.query.sort as string;

    if (!sort) return [];

    if (typeof validParams != 'object')
      throw new BadRequestException('Invalid sort parameter');

    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;

    const sortArray = sort.split(',');

    const sortObjects: Sorting[] = [];

    for (const value of sortArray) {
      if (!value.match(sortPattern))
        throw new BadRequestException('Invalid sort parameter');

      const [property, direction] = value.split(':');

      if (!validParams.includes(property))
        throw new BadRequestException(`Invalid sort property: ${property}`);

      sortObjects.push({ [property]: direction });
    }

    return sortObjects;
  },
);
