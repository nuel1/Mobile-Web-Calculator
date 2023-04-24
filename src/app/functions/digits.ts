/**
 *
 * Get a new set of number or digits
 */

const removeZeroAtFirstPos = (numStr: string) => {
  return numStr.replace(/\./, '');
};

const scanNumStrForProperArrangement = (numStr: string) => {
  if (
    numStr.length > 1 &&
    numStr.search(/0/) === 0 &&
    numStr.search(/\./) !== 1
  ) {
    return removeZeroAtFirstPos(numStr);
  }

  return numStr;
};

export const getNewNumberStr = (oldNumberStr: string, newNumberStr: string) => {
  const impureNumSet = oldNumberStr.concat(newNumberStr);
  const pureNumSet = scanNumStrForProperArrangement(impureNumSet);

  return pureNumSet;
};

export const getNewNumberInLocaleStr = (
  oldNumberStr: string,
  newNumberStr: string
) => {
  const impureNumSet = Number(
    oldNumberStr.concat(newNumberStr)
  ).toLocaleString();
  const pureNumSet = scanNumStrForProperArrangement(impureNumSet);

  return pureNumSet;
};
