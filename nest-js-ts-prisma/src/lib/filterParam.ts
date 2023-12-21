// Import the PrismaClient and the Prisma namespace from the prisma library
import { PrismaClient, Prisma } from '@prisma/client';
// Import the BadRequestException, createParamDecorator, and ExecutionContext classes from NestJS
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
// Import the Request interface from Express
import { Request } from 'express';

// Create a new PrismaClient instance
const prisma = new PrismaClient();

// Define an interface for the filter params
export interface Filtering {
  property: string;
  rule: string;
  value: string;
}

// Define an enum for the valid filter rules
export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull',
}

// Write a custom decorator named FilteringParams
export const FilteringParams = createParamDecorator(
  // Define a function that takes the valid params as an argument and returns a function that takes the execution context as an argument
  (validParams, ctx: ExecutionContext): Filtering | null => {
    // Get the request object from the execution context
    const req: Request = ctx.switchToHttp().getRequest();
    // Get the filter value from the query string
    const filter = req.query.filter as string;
    // If the filter value is falsy, return null
    if (!filter) return null;

    // Check if the valid params is an array
    if (typeof validParams != 'object')
      // If not, throw a BadRequestException with a message
      throw new BadRequestException('Invalid filter parameter');

    // Validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
    if (
      !filter.match(
        /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/,
      ) &&
      !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
    ) {
      // If not, throw a BadRequestException with a message
      throw new BadRequestException('Invalid filter parameter');
    }

    // Extract the parameters and validate if the rule and the property are valid
    const [property, rule, value] = filter.split(':');
    if (!validParams.includes(property))
      // If not, throw a BadRequestException with a message
      throw new BadRequestException(`Invalid filter property: ${property}`);
    if (!Object.values(FilterRule).includes(rule as FilterRule))
      // If not, throw a BadRequestException with a message
      throw new BadRequestException(`Invalid filter rule: ${rule}`);

    // Return an object with the property, rule, and value values
    return { property, rule, value };
  },
);

// Use the FilteringParams decorator to validate and extract the filter params from the query string
