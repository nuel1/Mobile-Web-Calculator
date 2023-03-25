import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-calculator-screen',
  templateUrl: './calculator-screen.component.html',
  styleUrls: ['./calculator-screen.component.scss'],
})
export class CalculatorScreenComponent implements OnChanges{
  @Input() mathExpression: Array<string> = [];
  @Input() numeric: Array<string> = [];

  expression: string = '';
  digit: string = '';
  ngOnChanges() {
    this.expression = this.mathExpression.join(' ');
    this.digit = this.numeric.join(' ');
  }
}
