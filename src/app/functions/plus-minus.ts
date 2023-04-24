const plusOrMinus = (numStr: string) => {
  return /^-/.test(numStr) ? numStr.replace('-', '') : `-${numStr}`;
};
