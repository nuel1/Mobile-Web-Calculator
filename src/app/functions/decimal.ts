export const includeDecimalPoint = (numStr: string) => {
  //Decimal can only be added once.
  return numStr.includes('.')
    ? numStr
    : !numStr.length
    ? numStr.concat('0.')
    : numStr.concat('.');
};
