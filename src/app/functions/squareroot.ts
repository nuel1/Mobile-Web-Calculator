export const squareRoot = (numStr: string) => {
  return String(Math.sqrt(Number(numStr)));
};

export const squareRootTemplate = (numStr: string) => {
  return `(\u221a${numStr})`;
};
