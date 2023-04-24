export const square = (numStr: string) => {
  return String(Math.pow(Number(numStr), 2));
};

export const squareTemplate = (numStr: string) => {
  return `(${numStr})\u00b2`;
};
//'\u00b2' - squared
//'\u0028' - for left parenthesis
//'\u0029' - for right parenthesis
