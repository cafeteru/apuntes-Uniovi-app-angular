import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDataComponent } from './subject-data.component';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from '../../../../core/models/subject';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SubjectDataComponent', () => {
  let component: SubjectDataComponent;
  let fixture: ComponentFixture<SubjectDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectDataComponent],
      imports: [
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                subject: new Subject()
              }
            }
          }
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestUtils.cleanSweetAlert();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
