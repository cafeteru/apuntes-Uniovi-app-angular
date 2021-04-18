import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from './base.component';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, of } from 'rxjs';
import { OptionsPage } from '../models/server/options-page';
import { map } from 'rxjs/operators';
import { Page } from '../models/server/page';

@Component({
  template: ''
})
export abstract class BaseTableComponent<T> extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  elementsPage = [5, 10, 25, 100];
  totalElements = 0;
  displayedColumns: string[];
  formGroup: FormGroup;
  data$: Observable<T[]> = of([]);
  protected entityFilter: T;

  protected constructor(
    protected translateService: TranslateService
  ) {
    super(translateService);
    this.displayedColumns = this.initColumns();
  }

  ngOnInit() {
    super.ngOnInit();
    this.cleanFilters();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      merge(
        this.paginator?.page,
        this.sort?.sortChange
      ).subscribe(res => {
        this.loadData();
      })
    );
    this.loadData();
  }

  cleanFilters(): void {
    this.entityFilter = this.initFilter();
    this.formGroup = this.initFormGroup();
    this.loadData();
  }

  filter(): void {
    this.entityFilter = this.configFilter();
    this.loadData();
  }

  protected getOptions(): OptionsPage {
    const options = new OptionsPage();
    options.createOptionsSearch(this.paginator, this.sort);
    return options;
  }

  protected loadData(): void {
    this.data$ = this.getData(this.getOptions()).pipe(
      map((res: Page<T>) => {
        this.totalElements = res?.totalElements;
        return res?.content;
      })
    );
  }

  protected abstract initColumns(): string[];

  protected abstract getData(options?: OptionsPage): Observable<Page<T>>;

  protected abstract initFilter(): T;

  protected abstract configFilter(): T;

  protected abstract initFormGroup(): FormGroup;
}
