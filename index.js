// expr = expression
function operate(expr) {
  const Calculate = (() => {
    const add = (x, y) => x + y;
    const subtract = (x, y) => x - y;
    const multiply = (x, y) => x * y;
    const divide = (x, y) => x / y;
    return { add, subtract, multiply, divide };
  })();

  switch (expr.operator) {
    case "+":
      return Calculate.add(expr.x, expr.y);
    case "-":
      return Calculate.subtract(expr.x, expr.y);
    case "*":
      return Calculate.multiply(expr.x, expr.y);
    case "/":
      return Calculate.divide(expr.x, expr.y);
    default:
      throw Error("Undefined operator");
  }
}
