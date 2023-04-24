export const fraction = (numStr: string) => {
  return String(1 / Number(numStr));
};

export const fractionTemplate = (numStr: string) => {
  return `1/(${numStr})`;
};
