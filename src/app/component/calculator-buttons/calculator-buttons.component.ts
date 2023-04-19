import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calculator-buttons',
  templateUrl: './calculator-buttons.component.html',
  styleUrls: ['./calculator-buttons.component.scss'],
})
export class CalculatorButtonsComponent {
  @Output() forDigit = new EventEmitter<string>();
  @Output() forSymbol = new EventEmitter<string>();
  @Output() pop = new EventEmitter();
  @Output() forDecimal = new EventEmitter<string>();
  @Output() clearComputation = new EventEmitter();
  @Output() clearScreen = new EventEmitter();
  @Output() forPercentage = new EventEmitter();
  @Output() addSubstraction = new EventEmitter();
  @Output() forSquareRoot = new EventEmitter();
  @Output() forSquare = new EventEmitter();
  @Output() forFraction = new EventEmitter();

  equal = '\uff1d';
  plus = '\uff0b';
  plusOrMinus = '\u00b1';
  times = '\u00d7';
  divide = '\u00f7';
  minus = '\u002d';

  toggleForDigit(digit: string) {
    this.forDigit.emit(digit);
  }

  /**
   *
   * @param codePoint is a numerical representation of a specific Unicode character.
   * Would use it to convert to character symbol or unicode symbol.
   * WHY? Well, due to some complex symbols missing on desktop keyboard, and
   * their operations not available in Javascript natively.
   */
  toggleForSymbol(codePoint: string) {
    this.forSymbol.emit(codePoint);
  }

  togglePop() {
    this.pop.emit();
  }

  toggleDecimal(decimal: string) {
    this.forDecimal.emit(decimal);
  }

  toggleClearComputation() {
    this.clearComputation.emit();
  }

  toggleClearScreen() {
    this.clearScreen.emit();
  }

  toggleForPercentage() {
    this.forPercentage.emit();
  }

  toggleSubtraction() {
    this.addSubstraction.emit();
  }

  toggleForSquareRoot() {
    this.forSquareRoot.emit();
  }

  toggleForSquare() {
    this.forSquare.emit();
  }

  toggleForFraction() {
    this.forFraction.emit();
  }
}
