/**
 * Formats for evaluation result.
 *
 * {resultStr} is a basic digit(s), which holds new evaluation result.
 * {resultForUI} is a `localeString` formatted digit(s), which holds new evaluation result.
 */
export type EvalResult = {
  resultStr: string;
  resultForUI: string;
};

/**
 * Evaluates `operation`
 * @param operation
 * @returns {EvalResult | Error | undefined }
 */
export const evaluate = (operation: string): EvalResult | Error | undefined => {
  /** Checks if operations is not of these arrangement
   * 1. num + num or
   * 2. num - num or
   * 3. num * num or
   * 4. num / num or
   * 5. (num)decimal point? + (num)decimal point? or
   * 6. (num)decimal point? - (num)decimal point? or
   * 7. (num)decimal point? * (num)decimal point? or
   * 8. (num)decimal point? / (num)decimal point? or
   * 9. -?(num) + -?(num) or
   * 10. -?(num) - -?(num) or
   * 11. -?(num) * -?(num) or
   * 12. -?(num) / -?(num)
   *
   **/
  if (
    !/^([-])?((\d+?[.]\d+?)|\d+)([+*-/])([-])?((\d+?[.]\d+?)|\d+)$/.test(
      operation
    )
  ) {
    return undefined as undefined;
  }

  const result = eval(operation);
  const resultForUI = Number(eval(operation)).toLocaleString();

  try {
    if (!isFinite(result as number)) throw Error;
  } catch (e) {
    throw e as Error;
  }

  const resultStr = String(result);
  return { resultStr, resultForUI } as EvalResult;
};
