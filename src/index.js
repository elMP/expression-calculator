function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  return calculate(expr);
}

function calculate(expr) {
  let operands = [];
  let operations = [];

  if (!testBrackets(expr))
    throw 'ExpressionError: Brackets must be paired';

  for (let i = 0, nextOperand = ''; i < expr.length; i++) {
    if (Number.isInteger(+expr[i]))
      nextOperand += expr[i];
    else {
      operands.push(nextOperand);
      nextOperand = '';
      operations.push(expr[i]);
    }
    if (i === expr.length - 1)
      operands.push(nextOperand);
  }

  let result = '';
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '+' || operations[i] === '-')
      continue;

    operands.splice(i, 2, doOneOperation(+operands[i], +operands[i + 1], operations[i]));
    operations.splice(i, 1);
    i--;
  }

  while (operands.length > 0) {
    let a = result ? result : operands.shift();
    let operation = operations.shift();
    let b = operands.shift();
    result = doOneOperation(+a, +b, operation);
  }

  return (result ^ 0) === result ? result : +result.toFixed(4);
}

function doOneOperation(first, second, operation) {
  switch (operation) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '*':
      result = first * second;
      break;
    case '/':
      if (second === 0)
        throw 'TypeError: Division by zero.';
      else
        result = first / second;
      break;
  }
  return result;
}

function testBrackets(expr) {
  let brackets = [];
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(')
      brackets.push(expr[i]);
    if (expr[i] === ')')
      if (brackets.length)
        brackets.pop();
      else
        return false;
  }

  return brackets.length === 0;
}

module.exports = {
  expressionCalculator
}

console.log(expressionCalculator('2    + 1'));
//console.log(expressionCalculator('2/0'));
console.log(expressionCalculator('49 * 63 / 58 * 36'));
console.log(expressionCalculator('84 + 62 / 33 * 10 + 15'));
