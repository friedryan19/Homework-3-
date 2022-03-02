/**
 * Do the calculation and return result to caller
 *
 * @param {String} op : one of '+', '-', '*', '/'
 * @param {Number} num1
 * @param {Number} num2
 *
 * @return {String}
 */
export const calculate = (op, num1, num2) => {
  let result;
  switch (op) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        result = 'Error: Divide by 0';
        break;
      }
      result = num1 / num2;
      break;

    default:
      break;
  }

  if (typeof result === 'number') {
    return Number.parseFloat(result.toPrecision(10)).toString();
  } else {
    return result;
  }
};
