import { DEFAULT_SKIP_QUERY, DEFAULT_TAKE_QUERY } from './db-query';

export function convertSkipToPage(skip: number, take: number) {
  if (take > 0) {
    return Math.floor(skip / take) + 1;
  }
  return 1;
}

export function getPaginationResponse(
  count: number,
  skip: number = DEFAULT_SKIP_QUERY,
  take: number = DEFAULT_TAKE_QUERY,
) {
  const page = convertSkipToPage(skip, take);
  return {
    count: Math.floor(count),
    take: Math.floor(take ?? DEFAULT_TAKE_QUERY),
    has_next_page: take < 1 ? false : count > take * page,
    has_previous_page: (page ?? 1) > 1,
    page: Math.floor(page),
  };
}