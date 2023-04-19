export interface InputAttributes {
  type: 'number' | 'symbol';
  value: string;
}

export const operation: Map<number, InputAttributes> = new Map();

export interface InputType {
  digit: string;
  symbol: string;
}

export const inputType: InputType = {
  digit: '',
  symbol: '',
};

export interface iOperationResult {
  result: number;
  void: boolean;
}

export const operationResult: iOperationResult = {
  result: 0,
  void: true,
};
