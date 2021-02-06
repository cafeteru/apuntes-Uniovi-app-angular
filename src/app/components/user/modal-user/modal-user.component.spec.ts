import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserComponent } from './modal-user.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestUtils } from '../../../core/utils/test-utils';
import { Address } from '../../../core/models/address';
import { LanguageType } from '../../../core/models/enums/language-type';

describe('AddUserComponent', () => {
  let component: ModalUserComponent;
  let fixture: ComponentFixture<ModalUserComponent>;

  const user: User = {
    address: new Address(),
    role: undefined,
    active: undefined,
    birthDate: undefined,
    email: undefined,
    id: undefined,
    identificationType: undefined,
    img: undefined,
    name: undefined,
    numberIdentification: undefined,
    password: undefined,
    phone: undefined,
    surname: undefined,
    username: undefined,
    language: LanguageType.ES
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUserComponent],
      imports: [
        LoggerTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        TestUtils.getLanguages(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: user},
        {provide: MAT_DIALOG_DATA, useValue: user},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
