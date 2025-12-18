import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateForm } from './rate-form';

describe('RateForm', () => {
  let component: RateForm;
  let fixture: ComponentFixture<RateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
