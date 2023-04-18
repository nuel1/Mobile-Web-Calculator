import { Component } from '@angular/core';
import { ignoreElements } from 'rxjs';

type PastComputation = {
  firstOperand: string;
  operator: string;
  secondOperand: string;
};

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  /**
   * 002B	+
   * 002D	-
   * 00D7 *
   * 00F7	/
   */

  codePoints = /([\u002b])([\u002d])([\u00d7])([\u00f7])/i;
  errorMessage = '';

  //firstOperand, secondOperand are number quantities which would be
  //applied together with operator for computation.
  firstOperandForComputation = '';
  secondOperandForComputation = '';
  operatorForComputation = '';

  //Rendered to the view(interface).
  firstOperandForView = '';
  secondOperandForView = '';
  operatorForView = '';

  // Hold updated operation performed on the calculator.
  computationForView = '';
  //Shows digit inputed or result for any computation.
  placeHolder = '0';
  history: PastComputation[] = [];

  addDigitToOperand(digit: string, operand: string, type: string) {
    if (operand.length === 1 && operand[0] === '0') {
      operand = operand.replace(/0/, '');
    }
    operand += digit;

    if (type === 'view') {
      // digits are comma seperated for numbers of (1000-infinity) displayed on the screen.
      // We need to remove the commas so it can be converted from localeString to a number.
      const strDigits = operand.replace(/,/g, '');
      operand = strDigits.match(/0\.0/)
        ? strDigits
        : Number(strDigits).toLocaleString();
    }

    return operand;
  }

  addDigit(digit: string) {
    // Operator being empty in this condition gives that
    // the value for first operand is yet to be defined.
    if (!this.operatorForComputation) {
      this.firstOperandForComputation = this.addDigitToOperand(
        digit,
        this.firstOperandForComputation,
        ''
      );

      this.firstOperandForView = this.addDigitToOperand(
        digit,
        this.firstOperandForView,
        'view'
      );

      this.placeHolder = this.firstOperandForView;
    } else {
      this.secondOperandForComputation = this.addDigitToOperand(
        digit,
        this.secondOperandForComputation,
        ''
      );

      this.secondOperandForView = this.addDigitToOperand(
        digit,
        this.secondOperandForView,
        'view'
      );

      this.placeHolder = this.secondOperandForView;
    }
  }

  convertCodeUnitToSymbol(codeunit: string) {
    /**
     * operatorTypes contains two similar types of operators, but distinct in terms of
     * application to arithmetic operation in javascript. That is, in real-life
     * mathematical application,they can be used interchangeably.
     * Accepted type of operators for computation in javascript are "+-/*".
     * However for display(to the user interface), these operators are substituted
     * with a similar, yet, visually different symbols, so that user understands
     * the function of each one of them.
     */
    let operatorTypes: { view: string; computation: string } = {
      view: '',
      computation: '',
    };

    switch (codeunit) {
      case '\uff0b':
        operatorTypes = {
          view: codeunit,
          computation: '+',
        };
        break;

      case '\u002d':
        operatorTypes = {
          view: codeunit,
          computation: '-',
        };
        break;
      case '\u00d7':
        operatorTypes = {
          view: codeunit,
          computation: '*',
        };
        break;
      case '\u00f7':
        operatorTypes = {
          view: codeunit,
          computation: '/',
        };
        break;
      default:
        throw new Error('Code unit not found');
    }

    return operatorTypes;
  }

  addOperatorTo(operator: string, type: string) {
    if (type === 'computation') this.operatorForComputation = operator;
    if (type === 'view') this.operatorForView = operator;
  }

  replacePreviousOperatorWith(newOperator: string, type: string) {
    if (type === 'computation') this.operatorForComputation = newOperator;
    if (type === 'view') this.operatorForView = newOperator;
  }

  /**
   *
   * @param result result returned by evaluation of an operation
   * @description
   * Updating:
   * 1. firstOperandForComputation
   * 2. firstOperandForView
   * 3. placeHolder
   */
  updateComputation(result: number) {
    this.firstOperandForComputation = String(result);
    this.firstOperandForView = result.toLocaleString();
    this.placeHolder = this.firstOperandForView;
  }

  resetValueForSecondOperand() {
    this.secondOperandForComputation = '';
    this.secondOperandForView = '';
  }

  resetValueForFirstOperand() {
    this.firstOperandForComputation = '';
    this.firstOperandForView = '';
  }

  evaluateOperation() {
    try {
      const operand1 = this.firstOperandForComputation;
      const operand2 = this.secondOperandForComputation;
      const operator = this.operatorForComputation;

      const computationResult = eval(`${operand1}${operator}${operand2}`);

      if (computationResult === Infinity) {
        this.errorMessage = 'Cannot divide by zero';
        throw Error(this.errorMessage);
      }

      if (isNaN(computationResult)) {
        this.errorMessage = 'Result is undefined';
        throw Error(this.errorMessage);
      }

      this.updateComputation(computationResult);
    } catch (e: unknown) {
      this.placeHolder = this.errorMessage;
      throw e;
    }
  }

  // Pad with zero from the left side
  padOperandWithZero(operand: string) {
    return operand.concat('0');
  }

  updateComputationToView(...args: string[]) {
    const operand1 = args[0] || '';
    const symbol = args[1] || '';
    const operand2 = args[2] || '';
    const equalSign = args[3] || '';

    this.computationForView = `${operand1} ${symbol} ${operand2} ${equalSign}`;
  }

  // Checks if reference(operands or operator) has a value.
  hasValue(reference: string) {
    return reference.length;
  }

  // Erases current operation.
  eraseOperation() {
    this.firstOperandForComputation = '';
    this.secondOperandForComputation = '';
    this.operatorForComputation = '';

    this.firstOperandForView = '';
    this.secondOperandForView = '';

    this.operatorForView = '';
  }

  clear() {
    if (this.hasValue(this.operatorForComputation)) {
      this.resetValueForSecondOperand();
    } else {
      this.resetValueForFirstOperand();
    }
    this.placeHolder = '0';
  }

  clearAll() {
    this.clear();
    this.eraseOperation();
    this.updateComputationToView();
  }

  saveToHistory(...history: string[]) {
    const operand1 = history[1];
  }

  showComputationError(...args: string[]) {
    this.updateComputationToView(args[0], args[1], args[2], args[3]);
  }

  addOperator(codeUnit: string) {
    let newOperatorForView = '',
      newOperatorForComputation = '';

    try {
      const { view, computation } = this.convertCodeUnitToSymbol(codeUnit);
      newOperatorForComputation = computation;
      newOperatorForView = view;

      if (!this.hasValue(this.firstOperandForComputation)) {
        let zeroPad = this.padOperandWithZero(this.firstOperandForComputation);
        this.firstOperandForComputation = zeroPad;
        this.firstOperandForView = zeroPad;
        console.log(this.firstOperandForComputation);
      }

      if (!this.hasValue(this.secondOperandForComputation)) {
        this.operatorForComputation = newOperatorForComputation;
        this.operatorForView = newOperatorForView;
      }

      if (
        this.hasValue(this.firstOperandForComputation) &&
        this.hasValue(this.secondOperandForComputation)
      ) {
        this.evaluateOperation();
        this.operatorForComputation = newOperatorForComputation;
        this.operatorForView = newOperatorForView;
      }

      this.resetValueForSecondOperand();
      this.updateComputationToView(
        this.firstOperandForView,
        this.operatorForView
      );
    } catch (e) {
      const operand1 = this.firstOperandForComputation;
      const operand2 = this.secondOperandForComputation;
      const currentOperatorForView = this.operatorForView;
      this.showComputationError(
        operand1,
        currentOperatorForView,
        operand2,
        newOperatorForView
      );
      this.eraseOperation();
      console.error(e);
    }
  }

  popDigitFrom(operand: string, type: string) {
    let newVal = '';

    if (type === 'view') {
      let strDigit = operand.replace(/,/g, '');
      const len = strDigit.length;
      strDigit = strDigit.substring(0, len - 1);
      newVal = strDigit.match(/0\.(\d+?)?/)
        ? strDigit
        : Number(strDigit).toLocaleString();
    } else {
      const len = operand.length;
      newVal = operand.substring(0, len - 1);
    }

    return newVal;
  }

  popDigit() {
    if (this.hasValue(this.operatorForComputation)) {
      if (this.hasValue(this.secondOperandForComputation)) {
        let c = this.popDigitFrom(
          this.secondOperandForComputation,
          'computation'
        );
        let v = this.popDigitFrom(this.secondOperandForView, 'view');

        this.secondOperandForComputation = c;
        this.secondOperandForView = v;
        this.placeHolder = this.secondOperandForView;
      }
    } else {
      if (this.hasValue(this.firstOperandForComputation)) {
        let c = this.popDigitFrom(
          this.firstOperandForComputation,
          'computation'
        );
        let v = this.popDigitFrom(this.firstOperandForView, 'view');

        this.firstOperandForComputation = c;
        this.firstOperandForView = v;
        this.placeHolder = this.firstOperandForView;
      }
    }
  }

  hasDecimal(operand: string) {
    return /\./.test(operand);
  }

  addDecimal(decimal: string) {
    if (this.hasValue(this.operatorForComputation)) {
      if (!this.hasDecimal(this.secondOperandForComputation)) {
        if (!this.hasValue(this.secondOperandForComputation)) {
          let zeroPad = this.padOperandWithZero(
            this.secondOperandForComputation
          );
          this.secondOperandForComputation = zeroPad;
          this.secondOperandForView = zeroPad;
        }

        this.secondOperandForComputation += decimal;
        this.secondOperandForView += decimal;
        this.placeHolder = this.secondOperandForView;
      }
    } else {
      if (!this.hasDecimal(this.firstOperandForComputation)) {
        if (!this.hasValue(this.firstOperandForComputation)) {
          let zeroPad = this.padOperandWithZero(
            this.firstOperandForComputation
          );
          this.firstOperandForComputation = zeroPad;
          this.firstOperandForView = zeroPad;
        }

        this.firstOperandForComputation += decimal;
        this.firstOperandForView += decimal;
        this.placeHolder = this.firstOperandForView;
      }
    }
  }

  evalulateToPercentage(num1: string, num2: string) {
    const result = (Number(num1) * Number(num2)) / 100;
    return String(result);
  }

  toPercentage() {
    if (this.hasValue(this.operatorForComputation)) {
      if (this.hasValue(this.secondOperandForComputation)) {
        this.secondOperandForComputation = this.evalulateToPercentage(
          this.firstOperandForComputation,
          this.secondOperandForComputation
        );
      } else {
        // If second operand is empty(that is, ''), then,
        // being first operand value is already defined, we can
        // assume its value to be the same with second operand,
        //and convert it to percentage. Therefore,
        this.secondOperandForComputation = this.evalulateToPercentage(
          this.firstOperandForComputation,
          this.firstOperandForComputation
        );
      }

      this.secondOperandForView = Number(
        this.secondOperandForComputation
      ).toLocaleString();
      this.placeHolder = this.secondOperandForView;
      this.updateComputationToView(
        this.firstOperandForView,
        this.operatorForView,
        this.secondOperandForView
      );
    }
  }

  addMinus(operand: string) {
    if (operand.search(/^-/) == -1) {
      return `-${operand}`;
    } else {
      return operand.replace('-', '');
    }
  }

  addMinusBeforeDigit() {
    if (
      this.hasValue(this.operatorForComputation) &&
      this.hasValue(this.secondOperandForComputation)
    ) {
      this.secondOperandForComputation = this.addMinus(
        this.secondOperandForComputation
      );
      this.secondOperandForView = Number(
        this.secondOperandForComputation
      ).toLocaleString();
      this.placeHolder = this.secondOperandForView;
    }

    if (
      !this.hasValue(this.operatorForComputation) &&
      this.hasValue(this.firstOperandForComputation)
    ) {
      this.firstOperandForComputation = this.addMinus(
        this.firstOperandForComputation
      );
      this.firstOperandForView = Number(
        this.firstOperandForComputation
      ).toLocaleString();
      this.placeHolder = this.firstOperandForView;
    }
  }

  convertTo(convertionType: Function, expressionWrapper: Function) {
    if (this.hasValue(this.operatorForComputation)) {
      if (this.hasValue(this.secondOperandForComputation)) {
        this.secondOperandForComputation = convertionType(
          this.secondOperandForComputation
        ).toString();
        this.secondOperandForView = expressionWrapper(
          this.secondOperandForView
        );
        this.placeHolder = Number(
          this.secondOperandForComputation
        ).toLocaleString();
        this.updateComputationToView(
          this.firstOperandForView,
          this.operatorForComputation,
          this.secondOperandForView
        );
      }
    } else {
      if (this.hasValue(this.firstOperandForComputation)) {
        this.firstOperandForComputation = convertionType(
          this.firstOperandForComputation
        ).toString();
        console.log(this.firstOperandForComputation);
        this.firstOperandForView = expressionWrapper(this.firstOperandForView);
        this.placeHolder = Number(
          this.firstOperandForComputation
        ).toLocaleString();
        this.updateComputationToView(
          this.firstOperandForView,
          this.operatorForComputation,
          this.secondOperandForView
        );
      }
    }
  }

  // Does the convertion
  toSquareRoot(operand: string) {
    return Math.sqrt(Number(operand));
  }

  // Wrap number within square root symbol
  wrapNumberWithSquareRoot(operand: string) {
    return `\u221a\u0028${operand}\u0029`;
  }
  // Shows result to view
  squareRoot() {
    this.convertTo(this.toSquareRoot, this.wrapNumberWithSquareRoot);
  }

  toSquare(operand: string) {
    return Math.pow(Number(operand), 2);
  }

  wrapNumberWithSquare(operand: string) {
    return `\u0028${operand}\u0029\u00b2`;
  }

  square() {
    this.convertTo(this.toSquare, this.wrapNumberWithSquare);
  }

  toFraction(operand: string) {
    return 1 / Number(operand);
  }

  wrapNumberInFraction(operand: string) {
    return `1/\u0028${operand}\u0029`;
  }

  fraction() {
    this.convertTo(this.toFraction, this.wrapNumberInFraction);
  }

  equalTo() {
    let result: string[] = [];
    try {
      if (!this.hasValue(this.operatorForComputation)) {
        result = result.concat(this.firstOperandForView, '\uff1d');
      }

      if (
        !this.hasValue(this.secondOperandForComputation) &&
        this.hasValue(this.operatorForComputation)
      ) {
        this.secondOperandForComputation = this.firstOperandForComputation;
        this.secondOperandForView = Number(
          this.secondOperandForComputation
        ).toLocaleString();

        this.evaluateOperation();
        result = result.concat(
          this.firstOperandForView,
          this.operatorForView,
          this.secondOperandForView,
          '\uff1d'
        );
      }

      if (
        this.hasValue(this.firstOperandForComputation) &&
        this.hasValue(this.secondOperandForComputation)
      ) {
        result = result.concat(
          this.firstOperandForView,
          this.operatorForView,
          this.secondOperandForView,
          '\uff1d'
        );
        this.evaluateOperation();
      }

      this.updateComputationToView(...result);
    } catch (e) {
      result = result.concat(
        this.firstOperandForView,
        this.operatorForView,
        this.secondOperandForView,
        '\uff1d'
      );
      this.updateComputationToView(...result);
      throw e;
    }
  }
}

//U+221A - square root
//'\u00b2' - squared
//'\u0028' - for left parenthesis
//'\u0029' - for right parenthesis
