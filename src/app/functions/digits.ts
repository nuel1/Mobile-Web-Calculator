/**
 * 
 * Trims out the first zero that preceeds `numStr`, except for decimal numbers.
 *
 * Involking `removeZeroAtFirstPos` on a non-decimal number with a preceeding zero,
 * for example 0123, will trim out the first zero and return the rest of the string.
 
 * ```typescript
 * removeZeroAtFirstPos('01213') //-> 1213
 * ```
 * If called on a decimal number, however, will return the original string
 * ```typescript
 * removeZeroAtFirstPos('0.23') // -> 0.23
 * ```
 * @param {string} num a number.
 * 
 * @returns {string} numStr.
 */
const removeZeroAtFirstPos = (num: string) => {
  return num.replace(/\./, '');
};

/**
 *`scanNumStrForProperArrangement` scan through `num` and calls `removeZeroAtFirstPos` if `num`
 * is preceeded by a zero and not a decimal number.
 *
 * @param {string} num a number.
 *
 * @returns {string} numStr
 */
const scanNumStrForProperArrangement = (num: string) => {
  if (num.length > 1 && num.search(/0/) === 0 && num.search(/\./) !== 1) {
    return removeZeroAtFirstPos(num);
  }

  return num;
};

/**
 * Concatenate a single digit `newNum` to the initial set of digit(s) `initialNum`
 * @param initialNum
 * @param newNum
 * @returns {string}
 */
export const getNewNumberStr = (initialNum: string, newNum: string) => {
  const impureNumSet = initialNum.concat(newNum);
  const pureNumSet = scanNumStrForProperArrangement(impureNumSet);

  return pureNumSet;
};

/**
 * Concatenate a single digit `newNum` to the initial set of digit(s) `initialNum`,
 * and transmute the result to a localString format.
 * @param initialum
 * @param newNum
 * @returns {string}
 */
export const getNewNumberInLocaleStr = (initialNum: string, newNum: string) => {
  const impureNumSet = Number(initialNum.concat(newNum)).toLocaleString();
  const pureNumSet = scanNumStrForProperArrangement(impureNumSet);

  return pureNumSet;
};
