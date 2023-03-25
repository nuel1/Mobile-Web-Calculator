import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorScreenComponent } from './calculator-screen.component';

describe('CalculatorScreenComponent', () => {
  let component: CalculatorScreenComponent;
  let fixture: ComponentFixture<CalculatorScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
