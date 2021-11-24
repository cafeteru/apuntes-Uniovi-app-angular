import { SnackBarComponent, SnackBarData } from './snack-bar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialDesignModule } from '../material-design.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TestUtils } from '../../../core/utils/test-utils';

const message: SnackBarData = {
  msg: '',
};

describe('SnackBarComponent', () => {
  let component = SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      imports: [MaterialDesignModule, TestUtils.getLanguages()],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: message,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
