import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnitSubjectComponent } from './modal-unit-subject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LearnSubjectService } from '../../../../core/services/learn-subject.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UnitSubject } from '../../../../core/models/unit-subject';

const matDialogRefMock = {
  close: () => of(),
};

describe('ModalAddUnitSubjectComponent', () => {
  let component: ModalUnitSubjectComponent;
  let fixture: ComponentFixture<ModalUnitSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUnitSubjectComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        LearnSubjectService,
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new UnitSubject(),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnitSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
