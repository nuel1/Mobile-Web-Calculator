export interface InputAttributes {
  type: 'number' | 'symbol';
  value: string;
}

export interface InputType {
  digit: string;
  symbol: string;
}

export const inputType: InputType = {
  digit: '',
  symbol: '',
};

export const operation: Map<number, InputAttributes> = new Map();
export const result = '';
export const noResult = false;
