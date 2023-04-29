export const fraction = (numStr: string) => {
  const result = eval(`1/${numStr}`);
  if (result === Infinity) throw Error;

  return String(result);
};

export const fractionTemplate = (numStr: string) => {
  return `1/(${numStr})`;
};
