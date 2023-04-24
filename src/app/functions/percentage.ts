export const convertToPercentage = (numStr1: string, numStr2: string) => {
  const num1 = Number(numStr1);
  const num2 = Number(numStr2);

  return String((num1 * num2) / 100);
};
