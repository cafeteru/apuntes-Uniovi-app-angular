import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
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
import { map } from 'rxjs/operators';
import { GLOBAL_CONSTANTS } from '../../../core/utils/global-constants';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ModalSubjectComponent } from '../modal-subject/modal-subject.component';

const SUCCESS_ADD_SUBJECT = marker('subject.add.successfully');

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
    protected translateService: TranslateService,
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(translateService);
  }

  ngOnInit(): void {
    this.cleanFilters();
  }

  /**
   * Clean al filters and reload list
   */
  cleanFilters(): void {
    this.subjectFilter = new Subject();
    this.formGroup = new FormGroup({
      name: new FormControl(this.subjectFilter.name),
      subjectType: new FormControl(this.subjectFilter.subjectType),
      active: new FormControl(this.subjectFilter.active),
    });
    this.getSubjects();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      merge(
        this.paginator.page,
        this.sort.sortChange
      ).subscribe(
        () => this.getSubjects()
      )
    );
  }

  /**
   * Filter the list of users
   */
  filter(): void {
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach(name => {
      this.subjectFilter[name] = this.formGroup.get(name).value;
    });
    this.getSubjects();
  }

  /**
   * Open a modal window to create a Subject
   */
  openModal(): void {
    const data = new Subject();
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data
    };
    const dialogRef = this.dialog.open(ModalSubjectComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSubjects();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_ADD_SUBJECT).subscribe(
            res => {
              this.snackBarService.showSuccess(res);
            }
          )
        );
      }
    });
  }

  disable(id: number, b: boolean): void {

  }

  askDelete(id: number): void {

  }

  private getSubjects(): void {
    const options = new OptionsPage();
    options.createOptionsSearch(this.paginator, this.sort);
    this.subjects$ = this.subjectService.findAll(options, this.subjectFilter).pipe(
      map((res) => {
        this.totalElements = res?.totalElements;
        return res?.content;
      })
    );
  }
}
