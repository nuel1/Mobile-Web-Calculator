//Evaluate when the any operator button is pressed.
export type EvalResult = {
  resultStr: string;
  resultForUI: string;
};

export const evaluate = (operation: string): EvalResult | Error | undefined => {
  if (
    !/^([-])?((\d+?[.]\d+?)|\d+)([+*-/])([-])?((\d+?[.]\d+?)|\d+)$/.test(
      operation
    )
  ) {
    return undefined as undefined;
  }

  const result = eval(operation);
  const resultForUI = Number(eval(operation)).toLocaleString();

  // Handle edge cases
  try {
    if (!isFinite(result as number)) throw Error;
  } catch (e) {
    throw e as Error;
  }

  const resultStr = String(result);
  return { resultStr, resultForUI } as EvalResult;
};
