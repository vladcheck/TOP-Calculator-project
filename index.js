function Expression(x, y, operator) {
  return { x: Number(x), y: Number(y), operator };
}

// expr = expression
function operate(expr) {
  const Calculate = (() => {
    const add = (x, y) => x + y;
    const subtract = (x, y) => x - y;
    const multiply = (x, y) => x * y;
    const divide = (x, y) => {
      if (y === 0) throw Error("Division by zero");
      return x / y;
    };
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

function parse(displayContent) {
  const pattern = RegExp(/(\d+)([\+\-\/\*])(\d+)/);
  const [text, x, operator, y] = pattern.exec(displayContent);
  return Expression(x, y, operator);
}

const display = document.getElementById("display");
const deleteSymbolBtn = document.getElementById("delete-symbol");
const clearDisplayBtn = document.getElementById("clear");
const numbersSection = document.querySelector(".numbers");

deleteSymbolBtn.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});

clearDisplayBtn.addEventListener("click", () => {
  display.textContent = "";
});

numbersSection.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.tagName === "BUTTON") {
    display.textContent += e.target.textContent;
  }
});
