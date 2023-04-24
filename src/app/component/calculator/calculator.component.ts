import { Component } from '@angular/core';
import { getNewNumberStr } from '../../functions/digits';
import { getNewNumberInLocaleStr } from '../../functions/digits';
import { includeDecimalPoint } from '../../functions/decimal';
import { evaluate } from 'src/app/functions/eval';
import { getNewSymbolForComputation } from 'src/app/functions/symbol';
import { getNewSymbolForUI } from 'src/app/functions/symbol';
import { convertToPercentage } from 'src/app/functions/percentage';
import { square } from 'src/app/functions/square';
import { squareTemplate } from 'src/app/functions/square';
import { squareRoot } from 'src/app/functions/squareroot';
import { squareRootTemplate } from 'src/app/functions/squareroot';
import { fraction } from 'src/app/functions/fraction';
import { fractionTemplate } from 'src/app/functions/fraction';

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

  firstNum = '';
  secondNum = '';
  operator = '';

  firstNum_UI = '';
  secondNum_UI = '';
  operator_UI = '';

  placeholder = '0';

  result = '';

  errorMessage = '';

  operation_UI = '';

  addNumber(numStr: string) {
    let oldNumberStr = '';
    //if {operator} value is an empty string add numStr to {firstNum}
    if (!this.operator) {
      oldNumberStr = this.firstNum;
      let newNumberStr = getNewNumberStr(oldNumberStr, numStr);
      this.firstNum = newNumberStr;

      oldNumberStr = this.firstNum_UI;
      newNumberStr = getNewNumberInLocaleStr(oldNumberStr, numStr);
      this.firstNum_UI = newNumberStr;
      this.placeholder = this.firstNum_UI;
    } else {
      // If result is found, reset firstNum's value and add new value to it.
      if (this.result) {
        this.firstNum = '';
        this.firstNum_UI = '';

        oldNumberStr = this.firstNum;
        let newNumberStr = getNewNumberStr(oldNumberStr, numStr);
        this.firstNum = newNumberStr;

        oldNumberStr = this.firstNum_UI;
        newNumberStr = getNewNumberInLocaleStr(oldNumberStr, numStr);
        this.firstNum_UI = newNumberStr;
        this.placeholder = this.firstNum_UI;
      } else {
        oldNumberStr = this.secondNum;
        let newNumberStr = getNewNumberStr(oldNumberStr, numStr);
        this.secondNum = newNumberStr;

        oldNumberStr = this.secondNum_UI;
        newNumberStr = getNewNumberInLocaleStr(oldNumberStr, numStr);
        this.secondNum_UI = newNumberStr;
        this.placeholder = this.secondNum_UI;
      }
    }
  }

  addDecimalPoint() {
    if (this.operator) {
      this.firstNum = includeDecimalPoint(this.firstNum);
      this.firstNum_UI = includeDecimalPoint(this.firstNum);
      this.placeholder = this.firstNum_UI;
    } else {
      // If result is found, reset firstNum's value and add new value to it.
      if (this.result) {
        this.firstNum = '';
        this.firstNum_UI = '';

        this.firstNum = includeDecimalPoint(this.firstNum);
        this.firstNum_UI = includeDecimalPoint(this.firstNum);
        this.placeholder = this.firstNum_UI;
      } else {
        this.secondNum = includeDecimalPoint(this.secondNum);
        this.secondNum_UI = includeDecimalPoint(this.secondNum_UI);
        this.placeholder = this.secondNum_UI;
      }
    }
  }

  addOperator(unicode: string) {
    this.operator = getNewSymbolForComputation(unicode) as string;
    this.operator_UI = getNewSymbolForUI(unicode) as string;
    /**
     * Once result is found through the evaluate made on the operation(as seen below),
     * the initial value of {secondNum} and {result} must be reset, in order to avoid a second
     * evaluation on both the {result}(whoose value is passed to the firstNum) and {secondNum}.
     */
    if (this.result) {
      this.secondNum = '';
      this.secondNum_UI = '';
      this.result = '';
    }

    const operation = `${this.firstNum || '0'}${this.operator}${
      this.secondNum
    }`;

    try {
      const { result, resultForUI } = evaluate(operation) as any;

      if (result as string) {
        this.firstNum = result;
        this.firstNum_UI = resultForUI;
        this.placeholder = this.firstNum_UI;
      }

      this.operation_UI = `${this.firstNum_UI || '0'} ${this.operation_UI}`;
    } catch (e) {
      //Determining the evaluation result to conclude on a correct error message.
      const n = eval(operation);
      if (isNaN(n)) this.errorMessage = 'Result is undefined';
      if (n === Infinity) this.errorMessage = "Can't divide by zero";
      this.placeholder = this.errorMessage;

      this.operation_UI = `${this.firstNum_UI} ${this.operation_UI} ${this.secondNum_UI}`;

      throw new Error(this.errorMessage);
    }
  }

  equalTo() {
    if (this.operator && !this.secondNum) {
      this.secondNum = this.firstNum;
      this.secondNum_UI = this.firstNum_UI;
    }

    const operation = `${this.firstNum || '0'}${this.operator}${
      this.secondNum
    }`;
    try {
      const { result, resultForUI } = evaluate(operation) as any;

      if (result as string) {
        this.firstNum = result;
        this.firstNum_UI = resultForUI;
        this.placeholder = this.firstNum_UI;
      }

      this.operation_UI = `${this.firstNum_UI || '0'} ${this.operator_UI} ${
        this.secondNum_UI
      } \uff1d`;
    } catch (e) {
      //Determining the evaluation result to conclude on a correct error message.
      const n = eval(operation);
      if (isNaN(n)) this.errorMessage = 'Result is undefined';
      if (n === Infinity) this.errorMessage = "Can't divide by zero";
      this.placeholder = this.errorMessage;

      this.operation_UI = `${(this.firstNum_UI, this.operator_UI)}`;

      throw new Error(this.errorMessage);
    }
  }

  pop() {
    if (this.operator && this.firstNum) {
      this.firstNum = this.firstNum.substring(0, this.firstNum.length - 1);
      this.firstNum_UI = Number(this.firstNum).toLocaleString();
      this.placeholder = this.firstNum_UI;
    }

    if (this.operator && this.secondNum) {
      this.secondNum = this.secondNum.substring(0, this.secondNum.length - 1);
      this.secondNum_UI = Number(this.secondNum).toLocaleString();
      this.placeholder = this.secondNum_UI;
    }
  }

  clear() {
    if ((!this.operator || this.result) && this.firstNum) {
      this.firstNum = '';
      this.firstNum_UI = '';
      this.placeholder = '0';
      this.operation_UI = '';
    }

    if (!this.result && this.operator && this.secondNum) {
      this.secondNum = '';
      this.secondNum_UI = '';
      this.placeholder = '0';
    }
  }

  clearAll() {
    this.firstNum = '';
    this.firstNum_UI = '';

    this.secondNum = '';
    this.secondNum_UI = '';

    this.result = '';

    this.placeholder = '0';

    this.operation_UI = '';
  }

  toPercentage() {
    if (this.firstNum === this.result) {
      /**
       * When {result} has the same value as {firstNum}, the conversion to
       * percentage will apply on {result} value and the {firstNum} value.
       * Thus:
       * result = 10;
       * firstNum = 10;
       * conversion -> (10 * 10)/100
       * This same values of {result} and {firstNum} only occur after a successful evaluation
       * of an operation.
       */
      this.result = convertToPercentage(this.firstNum, this.result);
      this.firstNum = this.result;

      this.firstNum_UI = Number(this.firstNum).toLocaleString();
      this.placeholder = this.firstNum_UI;

      this.operation_UI = `${this.firstNum_UI}`;
    }

    if (this.firstNum !== this.result && this.result) {
      /**
       * { firstNum !== result} firstNum * result.
       * This only executes when {result} value is not same as {firstNum} value.
       */
      this.firstNum = convertToPercentage(
        this.firstNum,
        String(Math.pow(Number(this.secondNum), 0))
      );
      this.firstNum_UI = Number(this.firstNum).toLocaleString();
      this.placeholder = this.firstNum_UI;

      this.operation_UI = `${this.firstNum_UI}`;
    }

    if (!this.result && !this.secondNum) {
      /**
       * { result === '' && secondNum === ''}
       * This only executes when {result} and {SecondNum} value is an empty string.
       */
      this.secondNum = this.firstNum;
      this.secondNum = convertToPercentage(this.firstNum, this.secondNum);
      this.secondNum_UI = Number(this.secondNum).toLocaleString();
      this.placeholder = this.secondNum_UI;

      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }

    if (!this.result && this.secondNum) {
      this.secondNum = convertToPercentage(this.firstNum, this.secondNum);
      this.secondNum_UI = Number(this.secondNum).toLocaleString();
      this.placeholder = this.secondNum_UI;

      this.operation_UI = `${this.firstNum_UI} ${this.operation_UI} ${this.secondNum_UI}`;
    }
  }

  toSquare() {
    if (
      this.firstNum === this.result ||
      (this.firstNum !== this.result && this.result)
    ) {
      this.firstNum_UI = squareTemplate(this.firstNum);
      this.firstNum = square(this.firstNum);
      this.placeholder = Number(this.firstNum).toLocaleString();
      this.operation_UI = this.firstNum_UI;
    }

    if (!this.result && !this.secondNum) {
      this.secondNum = this.firstNum;
      this.secondNum_UI = squareTemplate(this.secondNum);
      this.secondNum = square(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }

    if (!this.result && this.secondNum) {
      this.secondNum_UI = squareTemplate(this.secondNum);
      this.secondNum = square(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }
  }

  toSquareRoot() {
    if (
      this.firstNum === this.result ||
      (this.firstNum !== this.result && this.result)
    ) {
      this.firstNum_UI = squareRootTemplate(this.firstNum);
      this.firstNum = squareRoot(this.firstNum);
      this.placeholder = Number(this.firstNum).toLocaleString();
      this.operation_UI = this.firstNum_UI;
    }

    if (!this.result && !this.secondNum) {
      this.secondNum = this.firstNum;
      this.secondNum_UI = squareRootTemplate(this.secondNum);
      this.secondNum = squareRoot(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }

    if (!this.result && this.secondNum) {
      this.secondNum_UI = squareRootTemplate(this.secondNum);
      this.secondNum = squareRoot(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }
  }

  toFraction() {
    if (
      this.firstNum === this.result ||
      (this.firstNum !== this.result && this.result)
    ) {
      this.firstNum_UI = fractionTemplate(this.firstNum);
      this.firstNum = fraction(this.firstNum);
      this.placeholder = Number(this.firstNum).toLocaleString();
      this.operation_UI = this.firstNum_UI;
    }

    if (!this.result && !this.secondNum) {
      this.secondNum = this.firstNum;
      this.secondNum_UI = fractionTemplate(this.secondNum);
      this.secondNum = fraction(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }

    if (!this.result && this.secondNum) {
      this.secondNum_UI = fractionTemplate(this.secondNum);
      this.secondNum = fraction(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }
  }

  toNegativeNumber() {
    if (
      this.firstNum === this.result ||
      (this.firstNum !== this.result && this.result)
    ) {
      this.firstNum_UI = fractionTemplate(this.firstNum);
      this.firstNum = fraction(this.firstNum);
      this.placeholder = Number(this.firstNum).toLocaleString();
      this.operation_UI = this.firstNum_UI;
    }

    if (!this.result && !this.secondNum) {
      this.secondNum = this.firstNum;
      this.secondNum_UI = fractionTemplate(this.secondNum);
      this.secondNum = fraction(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }

    if (!this.result && this.secondNum) {
      this.secondNum_UI = fractionTemplate(this.secondNum);
      this.secondNum = fraction(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }
  }
}

//U+221A - square root
//'\u00b2' - squared
//'\u0028' - for left parenthesis
//'\u0029' - for right parenthesis
