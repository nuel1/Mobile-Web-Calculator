import { Component, Input } from '@angular/core';
import { InputType } from 'src/app/main';

@Component({
  selector: 'app-calculator-screen',
  templateUrl: './calculator-screen.component.html',
  styleUrls: ['./calculator-screen.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorScreenComponent {
  @Input() inputType: InputType;
  f = '<span>10</span>';

  get computedDigits() {
    const digits: string = this.inputType.digit;
    const decimalCheckPattern = /[.]$/;

    if (decimalCheckPattern.test(digits)) {
      if (!(digits.length > 3)) return digits;
      //nonDecimal has no decimal point.
      const nonDecimal = digits.replace(/[.]$/, '');
      return Number(nonDecimal).toLocaleString().concat('.');
    }

    const numbers: number = Number(digits);
    const digitsInlocaleString: string = numbers.toLocaleString();

    return digitsInlocaleString;
  }

  showMergedArithmeticToScreen(obj) {}
}
