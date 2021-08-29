function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  let first = '';
  let second = '';
  let operands = [];
  let operations = [];
  let operation = ''
  for (let i = 0, nextOperand = ''; i < expr.length; i++) {
    //let nextOperand = '';
    if (Number.isInteger(+expr[i]))
      /*     if (operation)
             second += expr[i];
           else
             first += expr[i];
             */
      nextOperand += expr[i];
    else {
      operands.push(nextOperand);
      nextOperand = '';
      operations.push(expr[i]);
    }
    if (i === expr.length - 1)
      operands.push(nextOperand);
  }

  //first = +first;
  //second = +second;

  //console.log(operands, operations);
  let result = '';
  for (let i = 0; i < operations.length; i++) {
    //console.log(operands, "splice")
    if (operations[i] === '+' || operations[i] === '-')
      continue;

    // operands[i] = doOneOperation(operands[i], operands[i + 1], operations[i]);
    operands.splice(i, 2, doOneOperation(+operands[i], +operands[i + 1], operations[i]));
    operations.splice(i, 1);
    i--;
    //console.log(operands, "splice", operations)
  }
  console.log(operands, "splice", operations);
  while (operands.length > 0) {
    let a = result ? result : operands.shift();
    let operation = operations.shift();
    let b = operands.shift();
    result = doOneOperation(+a, +b, operation);
  }

  return (result ^ 0) === result ? result : +result.toFixed(4);
}

function doOneOperation(first, second, operation) {
  console.log(first, second, operation);
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
  //console.log(result)
  return result;
}

module.exports = {
  expressionCalculator
}

console.log(expressionCalculator('2    + 1'));
//console.log(expressionCalculator('2/0'));
console.log(expressionCalculator('49 * 63 / 58 * 36'));
console.log(expressionCalculator('84 + 62 / 33 * 10 + 15'));
