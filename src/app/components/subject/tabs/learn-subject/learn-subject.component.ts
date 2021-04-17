import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { LearnSubjectService } from '../../../../core/services/learn-subject.service';
import { Subject } from '../../../../core/models/subject';
import { BaseTableComponent } from '../../../../core/base/base-table.component';
import { Page } from '../../../../core/models/server/page';
import { Observable } from 'rxjs';
import { OptionsPage } from '../../../../core/models/server/options-page';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '../../../../core/models/address';

@Component({
  selector: 'app-learn-subject',
  templateUrl: './learn-subject.component.html',
  styleUrls: ['./learn-subject.component.scss']
})
export class LearnSubjectComponent extends BaseTableComponent<User> implements OnInit {
  private subject: Subject;

  constructor(
    protected translateService: TranslateService,
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
  }

  protected configFilter(): User {
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach(name => {
      this.entityFilter[name] = this.formGroup.get(name).value;
    });
    return this.entityFilter;
  }

  protected getData(options: OptionsPage | undefined): Observable<Page<User>> {
    return this.learnSubjectService.findStudentsBySubjectId(this.subject.id);
  }

  protected initColumns(): string[] {
    return ['username', 'name', 'surname', 'role', 'actions'];
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

  askDelete(id) {
    
  }
}
