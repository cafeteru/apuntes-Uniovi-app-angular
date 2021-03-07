import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalDataComponent } from './user-personal-data.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { rootRoutes } from '../../../../app-routing.module';
import { CoreModule } from '../../../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../core/models/user';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('UserPersonalDataComponent', () => {
  let component: UserPersonalDataComponent;
  let fixture: ComponentFixture<UserPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserPersonalDataComponent,
      ],
      imports: [
        LoggerTestingModule,
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
                user: new User()
              }
            }
          }
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalDataComponent);
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
