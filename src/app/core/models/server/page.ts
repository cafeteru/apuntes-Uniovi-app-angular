/**
 * Represent paged server information
 */
export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

/**
 * Represent pageable options from paged server information
 */
interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

/**
 * Represent sort options from paged server information
 */
interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

