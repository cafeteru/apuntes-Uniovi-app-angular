/**
 * Represent server paging options
 */
export class OptionsPage {
  sort?: string;
  size?: number;
  page?: number;

  constructor() {
    this.sort = '';
    this.size = 5;
    this.page = 0;
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
