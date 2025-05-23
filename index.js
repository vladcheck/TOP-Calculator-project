const OPERANDS_STRING = "^*/+-";
const expressionPattern = RegExp(/(\-?\d+\.?\d*)([\^\+\-\/\*])(\d+\.?\d*)/);
const operandAtTheEndPattern = RegExp(/[\^\+\-\*\/]$/);

let isAnswerShown = false;

const display = document.getElementById("display");
const deleteSymbolBtn = document.getElementById("delete-symbol");
const clearDisplayBtn = document.getElementById("clear");
const numbersSection = document.querySelector(".numbers");
const operands = document.querySelectorAll(".operand");
const equalsBtn = document.getElementById("equals");

function evaluateExpression() {
  const expression = parse(display.textContent);
  const answer = operate(expression);
  display.textContent = answer;
  isAnswerShown = true;
}

function putNumber(numberStr) {
  if (isAnswerShown) {
    display.textContent = numberStr;
    isAnswerShown = false;
  } else {
    display.textContent += numberStr;
  }
}

function putOperand(operandChar) {
  if (display.textContent.match(operandAtTheEndPattern)) {
    display.textContent = display.textContent.slice(0, -1) + operandChar;
  } else {
    display.textContent += operandChar;
  }
  isAnswerShown = false;
}

function Expression(x, y, operator) {
  return { x: parseFloat(x), y: parseFloat(y), operator };
}

function removeLastCharacter() {
  display.textContent = display.textContent.slice(0, -1);
}

function clearDisplay() {
  display.textContent = "";
}

// expr = expression
function operate(expr) {
  const Calculate = (() => {
    const add = (x, y) => x + y;
    const subtract = (x, y) => x - y;
    const multiply = (x, y) => x * y;
    const divide = (x, y) => {
      if (y === 0) throw Error("Division by zero");
      return ((x + 0.0) / y).toFixed(5);
    };
    const pow = (x, y) => Math.pow(x, y);
    return { add, subtract, multiply, divide, pow };
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
    case "^":
      return Calculate.pow(expr.x, expr.y);
    default:
      throw Error("Undefined operator");
  }
}

function parse(displayContent) {
  const parsingResult = expressionPattern.exec(displayContent);
  console.log(parsingResult);
  if (!parsingResult) {
    throw Error("Invalid expression");
  } else {
    const [text, x, operator, y] = parsingResult;
    return Expression(x, y, operator);
  }
}

deleteSymbolBtn.addEventListener("click", removeLastCharacter);
clearDisplayBtn.addEventListener("click", clearDisplay);

operands.forEach((operand) => {
  operand.addEventListener("click", (e) => {
    putOperand(e.target.textContent);
  });
});

numbersSection.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.tagName === "BUTTON") {
    putNumber(e.target.textContent);
  }
});

equalsBtn.addEventListener("click", evaluateExpression);

document.addEventListener("keydown", (e) => {
  const key = e.key;
  console.log(key);
  if (key === "Enter" || key === "=") {
    evaluateExpression();
  } else if (key === "Backspace") {
    removeLastCharacter();
  } else if ("0123456789.".includes(key)) {
    putNumber(key);
  } else if (OPERANDS_STRING.includes(key)) {
    putOperand(key);
  }
});
