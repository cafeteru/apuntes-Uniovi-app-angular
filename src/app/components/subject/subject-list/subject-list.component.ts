import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { SubjectService } from '../../../core/services/subject.service';
import { OptionsPage } from '../../../core/models/server/options-page';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from '../../../core/models/subject';
import { SubjectType } from '../../../core/models/enums/subject-type';
import { map, tap } from 'rxjs/operators';
import { Address } from '../../../core/models/address';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  elementsPage = [5, 10, 25, 100];
  displayedColumns = ['name', 'subjectType', 'actions'];
  subjects$: Observable<Subject[]> = of([]);
  totalElements = 0;
  formGroup: FormGroup;
  subjectTypes = Object.keys(SubjectType);
  private subjectFilter = new Subject();

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(logger, translateService);
    this.logger.debug(SubjectListComponent.name, 'constructor()', 'start');
    this.logger.debug(SubjectListComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(SubjectListComponent.name, 'ngOnInit()', 'start');
    this.cleanFilters();
    this.logger.debug(SubjectListComponent.name, 'ngOnInit()', 'end');
  }

  /**
   * Clean al filters and reload list
   */
  cleanFilters(): void {
    this.logger.debug(SubjectListComponent.name, 'cleanFilters()', 'start');
    this.subjectFilter = new Subject();
    this.formGroup = new FormGroup({
      name: new FormControl(this.subjectFilter.name),
      subjectType: new FormControl(this.subjectFilter.subjectType),
      active: new FormControl(this.subjectFilter.active),
    });
    this.getSubjects();
    this.logger.debug(SubjectListComponent.name, 'cleanFilters()', 'end');
  }

  ngAfterViewInit(): void {
    this.logger.debug(SubjectListComponent.name, 'ngAfterViewInit()', 'start');
    this.subscriptions.push(
      merge(
        this.paginator.page,
        this.sort.sortChange
      ).subscribe(
        () => this.getSubjects()
      )
    );
    this.logger.debug(SubjectListComponent.name, 'ngAfterViewInit()', 'end');
  }

  /**
   * Filter the list of users
   */
  filter(): void {
    this.logger.debug(SubjectListComponent.name, 'filter()', 'start');
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach(name => {
      this.subjectFilter[name] = this.formGroup.get(name).value;
    });
    this.getSubjects();
    this.logger.debug(SubjectListComponent.name, 'filter()', 'end');
  }

  disable(id: number, b: boolean): void {

  }

  askDelete(id: number): void {

  }

  private getSubjects(): void {
    this.logger.debug(SubjectListComponent.name, 'getUsers()', 'start');
    const options = new OptionsPage();
    options.createOptionsSearch(this.paginator, this.sort);
    this.subjects$ = this.subjectService.findAll(options, this.subjectFilter).pipe(
      map((res) => {
        this.totalElements = res?.totalElements;
        return res?.content;
      }),
      tap(() => this.logger.debug(SubjectListComponent.name, 'getUsers()', 'end'))
    );
  }
}
