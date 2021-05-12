import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../core/models/user';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
import { LearnSubjectService } from '../../../../../core/services/learn-subject.service';
import { Subject } from '../../../../../core/models/subject';
import { BaseTableComponent } from '../../../../../core/base/base-table.component';
import { Page } from '../../../../../core/models/server/page';
import { Observable } from 'rxjs';
import { OptionsPage } from '../../../../../core/models/server/options-page';
import { FormControl, FormGroup } from '@angular/forms';
import { GLOBAL_CONSTANTS } from '../../../../../core/utils/global-constants';
import {
  ModalLearnSubjectComponent,
  ModalLearnSubjectData
} from '../../modal-learn-subject/modal-learn-subject.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LearnSubject } from '../../../../../core/models/learn-subject';
import { switchMap, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

const SUCCESS_ADD = marker('learn-subject.add.successfully');

@Component({
  selector: 'app-learn-subject',
  templateUrl: './learn-subject.component.html',
  styleUrls: ['./learn-subject.component.scss']
})
export class LearnSubjectComponent extends BaseTableComponent<User> implements OnInit {
  students = new MatTableDataSource<User>();

  private subject: Subject;
  private isEmpty = true;

  constructor(
    protected translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private learnSubjectService: LearnSubjectService
  ) {
    super(translateService);
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.subject) {
      this.subject = this.route.snapshot.data.subject;
    }
    super.ngOnInit();

  }

  openModal(): void {
    const data: ModalLearnSubjectData = {
      subject: this.subject,
      isEmpty: this.isEmpty
    };
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data
    };
    const dialogRef = this.dialog.open(ModalLearnSubjectComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cleanFilters();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_ADD).subscribe(
            res => {
              this.snackBarService.showSuccess(res);
            }
          )
        );
      }
    });
  }

  showStudentDetails(id: number): void {
    this.router.navigateByUrl(`/menu/users/${id}`).then();
  }

  askDelete(id): void {
    this.subscriptions.push(
      this.data$.pipe(
        switchMap(students => {
          const learnSubjects = students.filter(x => x.id !== id).map(
            student => new LearnSubject(this.subject.id, student.id));
          return this.learnSubjectService.create(this.subject.id, learnSubjects);
        })
      ).subscribe(
        () => this.cleanFilters()
      )
    );
  }

  protected configFilter(): User {
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach(name => {
      this.entityFilter[name] = this.formGroup.get(name).value;
    });
    return this.entityFilter;
  }

  protected getData(options: OptionsPage | undefined): Observable<Page<User>> {
    return this.learnSubjectService.findStudentsBySubjectId(this.subject?.id, options).pipe(
      tap(page => this.isEmpty = page ? page.empty : true),
    );
  }

  protected initColumns(): string[] {
    return ['username', 'name', 'surname', 'actions'];
  }

  protected initFilter(): User {
    return new User();
  }

  protected initFormGroup(): FormGroup {
    return new FormGroup({
      surname: new FormControl(this.entityFilter.surname),
      name: new FormControl(this.entityFilter.name),
      email: new FormControl(this.entityFilter.email),
      phone: new FormControl(this.entityFilter.phone),
      birthDate: new FormControl(this.entityFilter.birthDate),
      username: new FormControl(this.entityFilter.username),
      identificationType: new FormControl(this.entityFilter.identificationType),
      numberIdentification: new FormControl(this.entityFilter.numberIdentification),
      street: new FormControl(this.entityFilter.address.street),
      city: new FormControl(this.entityFilter.address.city),
      postalCode: new FormControl(this.entityFilter.address.postalCode),
      active: new FormControl(this.entityFilter.active),
    });
  }

  protected loadData(): void {
    super.loadData();
    const subscription = this.data$.subscribe(
      students => this.students.data = students ? students : []);
    this.subscriptions.push(subscription);
    this.students.paginator = this.paginator;
    this.students.sortingDataAccessor =
      (user: User, property: string) => {
        switch (property) {
          case 'username':
            return user.username;
          case 'name':
            return user.name;
          case 'surname':
            return user.surname;
          default:
            return user[property];
        }
      };
    this.students.sort = this.sort;
  }
}
