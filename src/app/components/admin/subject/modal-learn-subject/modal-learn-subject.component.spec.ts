import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLearnSubjectComponent, ModalLearnSubjectData } from './modal-learn-subject.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnSubjectService } from '../../../../core/services/learn-subject.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Subject } from '../../../../core/models/subject';

const matDialogRefMock = {
  close: () => of()
};

describe('ModalLearnSubjectComponent', () => {
  let component: ModalLearnSubjectComponent;
  let fixture: ComponentFixture<ModalLearnSubjectComponent>;
  const matData: ModalLearnSubjectData = {
    subject: new Subject(),
    isEmpty: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLearnSubjectComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        LearnSubjectService,
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matData
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLearnSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
