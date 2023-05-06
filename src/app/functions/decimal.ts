/**
 * Adds a decimal point between digits.
 *
 * A decimal point can only be placed in a single position between digits.
 * In other words, a number with a decimal point cannot be added another decimal point.
 * 
 * @param numStr a number.

 * @returns {string} numStr.
 */
export const includeDecimalPoint = (numStr: string) => {
  return numStr.includes('.')
    ? numStr
    : !numStr.length
    ? numStr.concat('0.')
    : numStr.concat('.');
};
