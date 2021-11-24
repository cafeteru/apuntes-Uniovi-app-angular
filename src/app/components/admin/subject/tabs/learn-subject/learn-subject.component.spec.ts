import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSubjectComponent } from './learn-subject.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../../core/core.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { TestUtils } from '../../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LearnSubjectComponent', () => {
  let component: LearnSubjectComponent;
  let fixture: ComponentFixture<LearnSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnSubjectComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
