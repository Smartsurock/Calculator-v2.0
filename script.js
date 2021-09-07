const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const answerBtn = document.querySelector("[data-answer]");
const piBtn = document.querySelector("[data-pi]");
const clearBtn = document.querySelector("[data-clear]");
const backBtn = document.querySelector("[data-back]");
const previosOperandValue = document.querySelector("[data-previos]");
const currentOperandValue = document.querySelector("[data-current]");
const answerValue = document.querySelector(".answer");

class Calculator {
  constructor(previosOperandValue, currentOperandValue) {
    this.previosOperandValue = previosOperandValue;
    this.currentOperandValue = currentOperandValue;
    this.answerValue = answerValue;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previosOperand = "";
    this.answerValue.innerText = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  clearTop() {
    this.currentOperand = "";
    this.previosOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  back() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
    } else if (this.previosOperand) {
      if (this.previosOperand.substring(this.previosOperand.length, this.previosOperand.length - 1) === " ") {
        this.previosOperand = this.previosOperand.substring(0, this.previosOperand.length - 1);
      }
      this.previosOperand = this.previosOperand.substring(0, this.previosOperand.length - 1);
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (number === "0" && this.currentOperand[0] === "0" && this.currentOperand.length === 1) return;
    if (number !== "." && this.currentOperand[0] === "0" && this.currentOperand.length === 1) {
      return this.currentOperand = this.currentOperand + "." + number;
    }
    if (this.currentOperand[0] === "." && this.currentOperand.length === 1) {
      return this.currentOperand = "0" + this.currentOperand + number;
    }
    this.currentOperand = this.currentOperand + number;
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previosOperand !== "") {
      this.getResult();
    }
    this.operation = operation;
    this.previosOperand = this.currentOperand + ` ${operation} `;
    if (this.operation === "x2") {
      this.getResult();
    }
    this.currentOperand = "";
    this.updateDisplay();
  }

  getResult() {
    let result;
    const previos = parseFloat(this.previosOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case "+":
        result = previos + current;
        break;
      case "−":
        result = previos - current;
        break;
      case "∗":
        result = previos * current;
        break;
      case "÷":
        result = previos / current;
        break;
      case "x2":
        result = current ** 2;
        break;
      case "xy":
        result = previos ** current;
        break;
      case "x-1":
        result = 1 / previos;
        break;
      default: return;
    }
    this.operation = undefined;
    this.answerValue.innerText = result;
    this.currentOperand = result;
    this.previosOperand = "";
    this.updateDisplay();
  }

  returnAnswer() {
    if (this.answerValue.innerText !== "") {
      this.currentOperand = this.answerValue.innerText;
      this.answerValue.innerText = "";
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.previosOperandValue.innerText = this.previosOperand;
    this.currentOperandValue.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(previosOperandValue, currentOperandValue);

numberBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
  })
});

operationBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
  })
});

equalBtn.addEventListener("click", () => {
  calculator.getResult();
  calculator.clearTop();
});

answerBtn.addEventListener("click", () => {
  calculator.returnAnswer();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
});

backBtn.addEventListener("click", () => {
  calculator.back();
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
      calculator.appendNumber("0");
      break;
    case "1":
      calculator.appendNumber(1);
      break;
    case "2":
      calculator.appendNumber(2);
      break;
    case "3":
      calculator.appendNumber(3);
      break;
    case "4":
      calculator.appendNumber(4);
      break;
    case "5":
      calculator.appendNumber(5);
      break;
    case "6":
      calculator.appendNumber(6);
      break;
    case "7":
      calculator.appendNumber(7);
      break;
    case "8":
      calculator.appendNumber(8);
      break;
    case "9":
      calculator.appendNumber(9);
      break;
    case ".":
      calculator.appendNumber(".");
      break;
    case "+":
      calculator.chooseOperation("+");
      break;
    case "-":
      calculator.chooseOperation("−");
      break;
    case "*":
      calculator.chooseOperation("∗");
      break;
    case "/":
      calculator.chooseOperation("÷");
      break;
    case "Enter":
      calculator.getResult();
      calculator.clearTop();
      break;

    default: return;
  }
});