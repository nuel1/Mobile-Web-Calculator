import { Component, Input } from '@angular/core';
import { InputType } from 'src/app/main';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  @Input() source: InputType;
}
