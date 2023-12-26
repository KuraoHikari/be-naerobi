export interface FindOneWithAuthResult<T> {
  data: T;
}

export type FindOneWithAuthFunction = <T, K>(
  model: any,
  args?: K,
) => Promise<FindOneWithAuthResult<T>>;

export type AuthorizeOption = {
  userId?: number | string;
};

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;
