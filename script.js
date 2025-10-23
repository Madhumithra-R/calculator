const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      resetCalculator();
    } else if (button.classList.contains('operator')) {
      handleOperator(value);
    } else if (button.classList.contains('equals')) {
      calculate();
    } else {
      appendNumber(value);
    }
    updateDisplay();
  });
});

function resetCalculator() {
  currentInput = '0';
  operator = '';
  firstOperand = null;
  waitingForSecondOperand = false;
}

function appendNumber(value) {
  if (waitingForSecondOperand) {
    currentInput = value;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? value : currentInput + value;
  }
}

function handleOperator(nextOperator) {
  if (nextOperator === '×') nextOperator = '*';
  if (nextOperator === '÷') nextOperator = '/';

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    calculate();
  }
  operator = nextOperator;
  waitingForSecondOperand = true;
}

function calculate() {
  if (firstOperand === null || operator === '' || waitingForSecondOperand) return;

  const secondOperand = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        alert('Cannot divide by zero!');
        resetCalculator();
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  firstOperand = result;
  operator = '';
  waitingForSecondOperand = false;

  if (isNaN(result) || !isFinite(result)) {
    alert('Invalid calculation!');
    resetCalculator();
  }
}

function updateDisplay() {
  display.textContent = currentInput;
}