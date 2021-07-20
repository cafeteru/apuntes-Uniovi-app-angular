import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSubjectComponent } from './units-subject.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../../core/core.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { TestUtils } from '../../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UnitsSubjectComponent', () => {
  let component: UnitsSubjectComponent;
  let fixture: ComponentFixture<UnitsSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitsSubjectComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,

      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
