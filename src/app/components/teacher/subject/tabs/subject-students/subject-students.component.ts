import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from '../../../../../core/base/base-table.component';
import { User } from '../../../../../core/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from '../../../../../core/models/subject';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
import { LearnSubjectService } from '../../../../../core/services/learn-subject.service';
import { switchMap, tap } from 'rxjs/operators';
import { LearnSubject } from '../../../../../core/models/learn-subject';
import { OptionsPage } from '../../../../../core/models/server/options-page';
import { Observable } from 'rxjs';
import { Page } from '../../../../../core/models/server/page';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject-students',
  templateUrl: './subject-students.component.html',
  styleUrls: ['./subject-students.component.scss']
})
export class SubjectStudentsComponent extends BaseTableComponent<User> implements OnInit {
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
