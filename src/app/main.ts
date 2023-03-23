// CalculatorInput is interpreted to be calculations,
//arithmetics and digits inputed into the calculator.
export interface CalculatorInput {
  //Accepts digits only.
  digit: string;
  //Accepts operators only.
  symbol: string;
  // Merges the digit and opertor to form a math operation.
  merge: string[];
}

export const input: CalculatorInput = {
  digit: '',
  symbol: '',
  merge: [],
};

export interface CalculatorResult {
  result: string;
  noResult: boolean;
}

export const calcResult: CalculatorResult = {
  result: '',
  noResult: true,
};
