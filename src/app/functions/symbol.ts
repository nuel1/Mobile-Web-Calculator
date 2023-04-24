type OperatorTypes = {
  operatorForComputation: string;
  operatorForUI: string;
};

const convertFromUnicodeToOperatorSymbol = (
  unicode: string
): OperatorTypes | Error => {
  /**
   * {operatorForComputation} will be used within the eval
     function of javascript for computation.

     {operatorForUI} for the user interface(would be what is seen).
    **/
  let operatorSymbolTypes: OperatorTypes;

  switch (unicode) {
    case '\u002b':
      operatorSymbolTypes = {
        operatorForComputation: '+',
        operatorForUI: unicode,
      };
      break;

    case '\u002d':
      operatorSymbolTypes = {
        operatorForComputation: '-',
        operatorForUI: unicode,
      };
      break;

    case '\u00d7':
      operatorSymbolTypes = {
        operatorForComputation: '*',
        operatorForUI: unicode,
      };

      break;

    case '\u00f7':
      operatorSymbolTypes = {
        operatorForComputation: '/',
        operatorForUI: unicode,
      };

      break;
    default:
      throw new Error(
        'Unicode is not a symbol for basic maths operations. Basic arithetic symbols are: +, -, *, /'
      );
  }

  return operatorSymbolTypes;
};

export const getNewSymbolForComputation = (unicode: string): string | Error => {
  let symbol = '';
  try {
    let { operatorForComputation } = convertFromUnicodeToOperatorSymbol(
      unicode
    ) as OperatorTypes;
    let symbol = operatorForComputation;
  } catch (e) {
    throw e as Error;
  }

  return symbol as string;
};

export const getNewSymbolForUI = (unicode: string): string | Error => {
  let symbol = '';
  try {
    let { operatorForUI } = convertFromUnicodeToOperatorSymbol(
      unicode
    ) as OperatorTypes;
    let symbol = operatorForUI;
  } catch (e) {
    throw e as Error;
  }

  return symbol as string;
};
