export class OptionsPage {
  sort?: string;
  size?: number;
  page?: number;

  toApi(): string {
    let value = this.sort ? `&sort=${this.sort}` : '';
    value += this.size ? `&size=${this.size}` : '';
    value += this.page ? `&page=${this.page}` : '';
    return '?' + value.substr(1, value.length - 1);
  }
}
