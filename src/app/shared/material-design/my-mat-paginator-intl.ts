import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class MyMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {
  private ofLabel = '';
  private subscription: Subscription;

  constructor(
    private translateService: TranslateService
  ) {
    super();
    translateService.onLangChange.subscribe(() => {
      this.load();
      this.changes.next();
    });
    this.load();
    this.loadRangeLabel();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadRangeLabel(): void {
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 ${this.ofLabel} ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} ${this.ofLabel} ${length}`;
    };
  }

  private load(): void {
    this.subscription = this.translateService.get(
      [
        'paginator.itemsPerPageLabel',
        'paginator.nextPageLabel',
        'paginator.previousPageLabel',
        'paginator.firstPageLabel',
        'paginator.lastPageLabel',
        'paginator.of']
    ).subscribe((res) => {
      this.itemsPerPageLabel = res['paginator.itemsPerPageLabel'];
      this.nextPageLabel = res['paginator.nextPageLabel'];
      this.previousPageLabel = res['paginator.previousPageLabel'];
      this.firstPageLabel = res['paginator.firstPageLabel'];
      this.lastPageLabel = res['paginator.lastPageLabel'];
      this.ofLabel = res['paginator.of'];
    });
  }
}
