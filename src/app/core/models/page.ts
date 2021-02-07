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

interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

