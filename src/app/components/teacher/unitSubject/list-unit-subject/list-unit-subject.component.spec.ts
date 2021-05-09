import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitSubjectComponent } from './list-unit-subject.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';

describe('ListUnitSubjectComponent', () => {
  let component: ListUnitSubjectComponent;
  let fixture: ComponentFixture<ListUnitSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUnitSubjectComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
      ],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUnitSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
