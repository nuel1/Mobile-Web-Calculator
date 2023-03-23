import { Component } from '@angular/core';
import { inputType, InputAttributes, operation } from 'src/app/main';

@Component({
  selector: 'app-calculator-buttons',
  templateUrl: './calculator-buttons.component.html',
  styleUrls: ['./calculator-buttons.component.scss'],
})
export class CalculatorButtonsComponent {
  addDigit(digit: string) {
    inputType.digit += digit;

    this.setDigitAttribute = inputType.digit;
  }

  set setDigitAttribute(digit: string) {
    const attribute: InputAttributes = {
      type: 'number',
      value: digit,
    };

    operation.set(operation.size, attribute);
  }
}
