// Project idea derived from official Microsoft Windows 10 standard calculator.

/**
 * Pure functions are imported here to anchor specific roles working
 * behind the scence to provide all the necessary functions for
 * the calculator.
 */

import { Component } from '@angular/core';
import { getNewNumberStr } from '../../functions/digits';
import { getNewNumberInLocaleStr } from '../../functions/digits';
import { includeDecimalPoint } from '../../functions/decimal';
import { evaluate } from '../../functions/eval';
import { getNewSymbolForComputation } from '../../functions/symbol';
import { getNewSymbolForUI } from '../../functions/symbol';
import { convertToPercentage } from '../../functions/percentage';
import { square } from '../../functions/square';
import { squareTemplate } from '../../functions/square';
import { squareRoot } from '../../functions/squareroot';
import { squareRootTemplate } from 'src/app/functions/squareroot';
import { fraction } from '../../functions/fraction';
import { fractionTemplate } from '../../functions/fraction';
import { plusOrMinus } from '../../functions/plus-minus';
import { EvalResult } from '../../functions/eval';

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

  //First operand in operation.
  firstNum = '';
  // Second operand in operation.
  secondNum = '';
  // Operator in operation.
  operator = '';

  //First operand in operation serving the interface.
  firstNum_UI = '';
  // Second operand in operation serving the interface.
  secondNum_UI = '';
  //Operator in operator serving the interface.
  operator_UI = '';

  //Shows digit as being punched in or included.
  placeholder = '0';

  //Holds computation result.
  result = '';

  //Holds operation error messages.
  errorMessage = '';

  //Operation serving the interface.
  operation_UI = '';

  /**
   *
   * @param numStr Passed in from child component(calculator-button), a single digit between the range 0-9.
   */
  addNumber(numStr: string) {
    let oldNumberStr = '';
    this.placeholder = '0';

    if (this.result.length && this.result == this.firstNum) {
      this.firstNum = '';
      this.firstNum_UI = '';
    }

    // if {operator} value is an empty string add numStr to {firstNum}
    if (!this.operator.length) {
      oldNumberStr = this.firstNum;
      let newNumberStr = getNewNumberStr(oldNumberStr, numStr);
      this.firstNum = newNumberStr;

      newNumberStr = getNewNumberInLocaleStr(oldNumberStr, numStr);
      this.firstNum_UI = newNumberStr;
      this.placeholder = this.firstNum_UI;

      return;
    }

    if (this.result.length && this.secondNum.length) {
      oldNumberStr = this.firstNum;
      let newNumberStr = getNewNumberStr(oldNumberStr, numStr);
      this.firstNum = newNumberStr;

      newNumberStr = getNewNumberInLocaleStr(oldNumberStr, numStr);
      this.firstNum_UI = newNumberStr;
      this.placeholder = this.firstNum_UI;

      return;
    }

    if (this.operator.length) {
      oldNumberStr = this.secondNum;
      let newNumberStr = getNewNumberStr(oldNumberStr, numStr);
      this.secondNum = newNumberStr;

      newNumberStr = getNewNumberInLocaleStr(oldNumberStr, numStr);
      this.secondNum_UI = newNumberStr;
      this.placeholder = this.secondNum_UI;

      return;
    }
  }

  addDecimalPoint() {
    if (!this.operator.length) {
      this.firstNum = includeDecimalPoint(this.firstNum);
      this.firstNum_UI = includeDecimalPoint(this.firstNum);
      this.placeholder = this.firstNum_UI;
    } else {
      // If result is found, reset firstNum's value and add new value to it.
      if (this.result.length) {
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
    /**
     * Once result is found through the evaluate made on the operation(as seen below),
     * the initial value of {secondNum} and {result} must be reset, in order to avoid a second
     * evaluation on both the {result}(whoose value is passed to the firstNum) and {secondNum}.
     */

    if (!this.firstNum.length) {
      this.firstNum = '0';
      this.firstNum_UI = '0';
    }

    this.firstNum = this.firstNum.match(/\d+\.$/)
      ? this.firstNum.replace('.', '')
      : this.firstNum;
    this.firstNum_UI = this.firstNum_UI.match(/\d+\.$/)
      ? this.firstNum_UI.replace('.', '')
      : this.firstNum_UI;

    if (this.result.length) {
      this.secondNum = '';
      this.secondNum_UI = '';
      this.result = '';
    }

    const operation = `${this.firstNum}${this.operator}${this.secondNum}`;

    try {
      if (evaluate(operation) as EvalResult) {
        const { resultStr, resultForUI } = evaluate(operation) as EvalResult;
        this.secondNum = '';
        this.secondNum_UI = '';
        this.firstNum = resultStr;
        this.firstNum_UI = resultForUI;
        this.placeholder = this.firstNum_UI;
      }

      this.operator = getNewSymbolForComputation(unicode) as string;
      this.operator_UI = getNewSymbolForUI(unicode) as string;

      this.operation_UI = `${this.firstNum} ${this.operator_UI}`;
    } catch (e) {
      //Determining the evaluation result to conclude on a correct error message.
      const n = eval(operation);
      if (isNaN(n)) this.errorMessage = 'Result is undefined';
      if (n === Infinity) this.errorMessage = "Can't divide by zero";
      this.placeholder = this.errorMessage;

      this.operation_UI = `${this.firstNum} ${this.operation_UI} ${this.secondNum}`;

      throw new Error(this.errorMessage);
    }
  }

  equalTo() {
    if (!this.firstNum.length) {
      this.firstNum = '0';
      this.firstNum_UI = '0';
    }

    this.secondNum = this.secondNum.match(/\d+\.$/)
      ? this.secondNum.replace('.', '')
      : this.secondNum;
    this.secondNum_UI = this.secondNum_UI.match(/\d+\.$/)
      ? this.secondNum_UI.replace('.', '')
      : this.secondNum_UI;

    if (this.operator.length && !this.secondNum.length) {
      this.secondNum = this.firstNum;
      this.secondNum_UI = this.firstNum_UI;
    }

    const operation = `${this.firstNum}${this.operator}${this.secondNum}`;

    try {
      if (evaluate(operation) as EvalResult) {
        const { resultStr, resultForUI } = evaluate(operation) as EvalResult;
        this.operation_UI = `${this.firstNum} ${this.operator_UI} ${this.secondNum} \uff1d`;

        this.firstNum = resultStr;
        this.firstNum_UI = resultForUI;
        this.result = resultStr;
        this.placeholder = this.firstNum_UI;
      } else {
        this.operation_UI = `${this.firstNum} ${this.operator_UI} ${this.secondNum} \uff1d`;
      }
    } catch (e) {
      //Determining the evaluation result to conclude on a correct error message.
      const n = eval(operation);
      if (isNaN(n)) this.errorMessage = 'Result is undefined';
      if (n === Infinity) this.errorMessage = "Can't divide by zero";
      this.placeholder = this.errorMessage;

      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI}`;

      throw new Error(this.errorMessage);
    }
  }

  pop() {
    if (!this.operator.length && this.firstNum.length) {
      this.firstNum = this.firstNum.substring(0, this.firstNum.length - 1);
      this.firstNum_UI = this.firstNum.match(/\d+?\.$/)
        ? this.firstNum
        : Number(this.firstNum).toLocaleString();
      this.placeholder = this.firstNum_UI;
    }

    if (this.operator.length && this.secondNum.length) {
      this.secondNum = this.secondNum.substring(0, this.secondNum.length - 1);
      this.secondNum_UI = this.secondNum.match(/\d+?\.$/)
        ? this.secondNum
        : Number(this.secondNum).toLocaleString();
      this.placeholder = this.secondNum_UI;
    }
  }

  clear() {
    if (this.result.length && this.firstNum.length) {
      this.firstNum = '';
      this.firstNum_UI = '';
      this.operation_UI = '';
    }

    if (!this.operator.length && this.firstNum.length) {
      this.firstNum = '';
      this.firstNum_UI = '';
    }

    if (!this.result.length && this.secondNum.length) {
      this.secondNum = '';
      this.secondNum_UI = '';
    }

    this.placeholder = '0';
  }

  clearAll() {
    this.firstNum = '';
    this.firstNum_UI = '';

    this.secondNum = '';
    this.secondNum_UI = '';

    this.operator = '';
    this.operator_UI = '';

    this.result = '';

    this.placeholder = '0';

    this.operation_UI = '';
  }

  toPercentage() {
    if (!this.operator.length || this.result.length) {
      if (!this.firstNum.length) {
        this.firstNum = '0';
        this.firstNum_UI = '0';
      }

      this.firstNum = this.firstNum.match(/\d+\.$/)
        ? this.firstNum.replace('.', '')
        : this.firstNum;
      this.firstNum_UI = this.firstNum_UI.match(/\d+\.$/)
        ? this.firstNum_UI.replace('.', '')
        : this.firstNum_UI;

      this.result = convertToPercentage(this.firstNum, this.result);
      this.firstNum = this.result;
      this.firstNum_UI = this.firstNum;
      this.placeholder = this.firstNum_UI;
      this.operation_UI = `${this.firstNum}`;
    }

    if (this.operator.length && !this.result.length) {
      if (this.secondNum.length) {
        this.secondNum = this.secondNum.match(/\d+\.$/)
          ? this.secondNum.replace('.', '')
          : this.secondNum;
        this.secondNum_UI = this.secondNum_UI.match(/\d+\.$/)
          ? this.secondNum_UI.replace('.', '')
          : this.secondNum_UI;
      } else {
        this.secondNum = this.firstNum;
      }

      this.secondNum = convertToPercentage(this.firstNum, this.secondNum);
      this.secondNum_UI = this.secondNum;
      this.placeholder = this.secondNum_UI;
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
    }
  }

  toSquare() {
    if (!this.operator.length || this.result.length) {
      if (!this.firstNum.length) {
        this.firstNum = '0';
        this.firstNum_UI = '0';
      }

      this.firstNum = this.firstNum.match(/\d+\.$/)
        ? this.firstNum.replace('.', '')
        : this.firstNum;
      this.firstNum_UI = this.firstNum_UI.match(/\d+\.$/)
        ? this.firstNum_UI.replace('.', '')
        : this.firstNum_UI;

      this.firstNum_UI = squareTemplate(this.firstNum);
      this.firstNum = square(this.firstNum);
      this.placeholder = Number(this.firstNum).toLocaleString();
      this.operation_UI = this.firstNum_UI;

      this.firstNum_UI = Number(this.firstNum).toLocaleString();
    }

    if (this.operator.length && !this.result.length) {
      if (this.secondNum.length) {
        this.secondNum = this.secondNum.match(/\d+\.$/)
          ? this.secondNum.replace('.', '')
          : this.secondNum;
        this.secondNum_UI = this.secondNum_UI.match(/\d+\.$/)
          ? this.secondNum_UI.replace('.', '')
          : this.secondNum_UI;
      } else {
        this.secondNum = this.firstNum;
      }
      this.secondNum_UI = squareTemplate(this.secondNum);
      this.secondNum = square(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;

      this.secondNum_UI = Number(this.secondNum).toLocaleString();
    }
  }

  toSquareRoot() {
    if (!this.operator.length || this.result.length) {
      if (!this.firstNum.length) {
        this.firstNum = '0';
        this.firstNum_UI = '0';
      }

      this.firstNum = this.firstNum.match(/\d+\.$/)
        ? this.firstNum.replace('.', '')
        : this.firstNum;
      this.firstNum_UI = this.firstNum_UI.match(/\d+\.$/)
        ? this.firstNum_UI.replace('.', '')
        : this.firstNum_UI;

      this.firstNum_UI = squareRootTemplate(this.firstNum);
      this.firstNum = squareRoot(this.firstNum);
      this.placeholder = Number(this.firstNum).toLocaleString();
      this.operation_UI = this.firstNum_UI;

      this.firstNum_UI = Number(this.firstNum).toLocaleString();
    }

    if (this.operator.length && !this.result.length) {
      if (this.secondNum.length) {
        this.secondNum = this.secondNum.match(/\d+\.$/)
          ? this.secondNum.replace('.', '')
          : this.secondNum;
        this.secondNum_UI = this.secondNum_UI.match(/\d+\.$/)
          ? this.secondNum_UI.replace('.', '')
          : this.secondNum_UI;
      } else {
        this.secondNum = this.firstNum;
      }

      this.secondNum_UI = squareRootTemplate(this.secondNum);
      this.secondNum = squareRoot(this.secondNum);
      this.placeholder = Number(this.secondNum).toLocaleString();
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;

      this.secondNum_UI = Number(this.secondNum).toLocaleString();
    }
  }

  toFraction() {
    if (!this.operator.length || this.result.length) {
      if (!this.firstNum.length) {
        this.firstNum = '0';
        this.firstNum_UI = '0';
      }

      this.firstNum = this.firstNum.match(/\d+\.$/)
        ? this.firstNum.replace('.', '')
        : this.firstNum;
      this.firstNum_UI = this.firstNum_UI.match(/\d+\.$/)
        ? this.firstNum_UI.replace('.', '')
        : this.firstNum_UI;

      this.firstNum_UI = fractionTemplate(this.firstNum);
      this.operation_UI = this.firstNum_UI;
      try {
        this.firstNum = fraction(this.firstNum);
        this.placeholder = Number(this.firstNum).toLocaleString();
        this.firstNum_UI = Number(this.firstNum).toLocaleString();
      } catch (e) {
        this.errorMessage = `Can't divide by zero`;
        this.placeholder = this.errorMessage;
        throw this.errorMessage;
      }
    }

    if (this.operator.length && !this.result.length) {
      if (this.secondNum.length) {
        this.secondNum = this.secondNum.match(/\d+\.$/)
          ? this.secondNum.replace('.', '')
          : this.secondNum;
        this.secondNum_UI = this.secondNum_UI.match(/\d+\.$/)
          ? this.secondNum_UI.replace('.', '')
          : this.secondNum_UI;

        this.secondNum_UI = fractionTemplate(this.secondNum);
        this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
      } else {
        this.secondNum = this.firstNum;
      }

      this.secondNum_UI = fractionTemplate(this.secondNum);
      this.operation_UI = `${this.firstNum_UI} ${this.operator_UI} ${this.secondNum_UI}`;
      try {
        this.secondNum = fraction(this.secondNum);
        this.placeholder = Number(this.secondNum).toLocaleString();
        this.secondNum_UI = Number(this.secondNum).toLocaleString();
      } catch (e) {
        this.errorMessage = `Can't divide by zero`;
        this.placeholder = this.errorMessage;
        throw this.errorMessage;
      }
    }
  }

  toNegativeNumber() {
    if (!this.operator.length || this.result.length) {
      if (this.firstNum !== '0' && this.firstNum.length) {
        this.firstNum_UI = plusOrMinus(this.firstNum_UI);
        this.firstNum = plusOrMinus(this.firstNum);
        this.placeholder = this.firstNum_UI;
      }
    }

    if (this.operator.length && !this.result.length) {
      if (this.secondNum !== '0' && this.secondNum.length) {
        this.secondNum_UI = plusOrMinus(this.secondNum_UI);
        this.secondNum = plusOrMinus(this.secondNum);
        this.placeholder = this.secondNum_UI;
      }
    }
  }
}

//U+221A - square root
//'\u00b2' - squared
//'\u0028' - for left parenthesis
//'\u0029' - for right parenthesis
