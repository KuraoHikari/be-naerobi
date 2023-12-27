import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { Request } from 'express';

export interface Filtering {
  [x: string]: { [x: string]: string | number };
}

export enum FilterRule {
  EQUALS = 'equals',
  NOT_EQUALS = 'not',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  CONTAINS = 'contains',
}

export enum CountingRule {
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
}

export const FilteringParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): Filtering | null => {
    const req: Request = ctx.switchToHttp().getRequest();

    const filter = req.query.filter as string;

    if (!filter) return null;

    if (typeof validParams != 'object') {
      throw new BadRequestException('Invalid filter parameter');
    }
    const filterArray = filter.split(',');

    const filterObject: Filtering = {};

    for (const filterExpression of filterArray) {
      if (
        !filterExpression.match(
          /^[a-zA-Z0-9_]+:(equals|not|gt|gte|lt|lte|contains):[a-zA-Z0-9_,]+$/,
        )
      ) {
        throw new BadRequestException('Invalid filter parameter');
      }

      const [property, rule, value] = filterExpression.split(':');

      if (!validParams.includes(property))
        throw new BadRequestException(`Invalid filter property: ${property}`);
      if (!Object.values(FilterRule).includes(rule as FilterRule))
        throw new BadRequestException(`Invalid filter rule: ${rule}`);
      if (Object.values(CountingRule).includes(rule as CountingRule)) {
        filterObject[property] = { [rule]: Number(value) };
      } else {
        filterObject[property] = { [rule]: value };
      }
    }

    return filterObject;
  },
);
