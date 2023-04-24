//Evaluate when the any operator button is pressed.
type EvaluateResult = {
  result: string | number | null;
  resultForUI: string | null;
};

export const evaluate = (
  operation: string
): EvaluateResult | Error | undefined => {
  if (!/^((\d+?[.]\d+?)|\d+)(?:[+*-/])((\d+?[.]\d+?)|\d+)$/.test(operation)) {
    return;
  }

  const result: string | number = eval(operation);
  const resultForUI = Number(eval(operation)).toLocaleString();

  // Handle edge cases
  try {
    if (!isFinite(result as number)) throw Error;
  } catch (e) {
    throw e;
  }

  return { result, resultForUI };
};
