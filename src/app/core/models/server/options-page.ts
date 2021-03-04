import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

/**
 * Represent server paging options
 */
export class OptionsPage {
  sort = '';
  size = 5;
  page = 0;
  query = '';

  /**
   * Method to create request with pagination and filters
   *
   * @param paginator MatPaginator of the component
   * @param sort MatSort of the component
   */
  createOptionsSearch(paginator: MatPaginator, sort: MatSort): void {
    this.size = paginator.pageSize ? paginator.pageSize : 5;
    this.page = paginator.pageIndex ? paginator.pageIndex : 0;
    this.sort = sort.active ? `${sort?.active},${sort?.direction}` : '';
  }

  /**
   * Create a string to send to the server from these options
   */
  toApi(): string {
    let value = this.sort ? `&sort=${this.sort}` : '';
    value += this.size ? `&size=${this.size}` : '';
    value += this.page ? `&page=${this.page}` : '';
    return '?' + value.substr(1, value.length - 1);
  }
}
