const root = document.documentElement;

checkBox = document.querySelector('input[type="checkbox"]');

checkBox.addEventListener("click", toggleTheme);

function toggleTheme() {
  if (checkBox.checked == false) {
    root.className = "dark";
  } else root.className = "light";
}

const numericKeys = document.getElementsByClassName("numeric");
const textDisplay1 = document.getElementById("text-1");
const textDisplay2 = document.getElementById("text-2");
const textDisplay3 = document.getElementById("text-3");
const textDisplay4 = document.getElementById("text-4");
const decimalKey = document.getElementById("dot");

const squrtBtn = document.getElementById("square-root");

const operatorObjects = document.getElementsByClassName("operator");

const plusNegetiveButton = document.getElementById("plus-negative");

const resultInput = document.getElementById("result");

const backSpaceBtn = document.getElementById("backspace");

const cancelBtn = document.getElementById("cancel-button");

const equalsBtn = document.getElementById("equals");

const AcBtn = document.getElementById("Ac-button");
const bodyID = document.getElementById("body-id");

squrtBtn.addEventListener("click", squarerooter);

AcBtn.addEventListener("click", clearScreen);

decimalKey.addEventListener("click", decimalOperation);

cancelBtn.addEventListener("click", canceler);

let operatorAllow = false;
let numeratorAllow = false;
let operandtoggle = true;
let plusNegativeAllow = true;
let plusNegativeToggle = true;
let decimalAllow = true;
let numeratorBlock = false;

let numeratorCount = 0;

let temp_operator = "";
let temp_number = "";
let mathExpression = [];

plusNegetiveButton.addEventListener("click", plusNegative);

backSpaceBtn.addEventListener("click", backSpacer);

equalsBtn.addEventListener("click", equalFn);

Array.from(numericKeys).forEach((element) =>
  element.addEventListener("click", numeratorFn)
);

Array.from(operatorObjects).forEach((element) =>
  element.addEventListener("click", operatorFn)
);

function canceler() {
  resultInput.textContent = "";
  numeratorAllow = true;
  numeratorBlock = false;
  operatorAllow = false;
  plusNegativeAllow = true;
  decimalAllow = true;
  bodyID.classList.remove("display-result");
  bodyID.classList.remove("text-display-1");
  mathExpression = [];
  temp_number = "";
  temp_operator = "";
  bodyID.classList.remove("display-result");
  bodyID.classList.remove("text-display-1");
}

function clearScreen() {
  resultInput.textContent = "";
  numeratorAllow = true;
  numeratorBlock = false;
  operatorAllow = false;
  plusNegativeAllow = true;
  decimalAllow = true;
  textDisplay1.textContent = "";
  textDisplay2.textContent = "";
  textDisplay3.textContent = "";
  textDisplay4.textContent = "";
  bodyID.classList.remove("display-result");
  bodyID.classList.remove("text-display-1");
  mathExpression = [];
  temp_number = "";
  temp_operator = "";
}

function squarerooter() {
  if (operandtoggle === false) {
    operatorAllow = true;
    plusNegativeAllow = true;
    decimalAllow = true;
    numeratorBlock = true;
    let tempResult = Number(resultInput.textContent);
    if (tempResult > 0) {
      tempResult = Math.sqrt(tempResult);
    }

    if (tempResult.toString().length > 13) {
      resultInput.textContent = tempResult.toExponential(7);
    } else resultInput.textContent = tempResult;
  }
}

function displayArray(displayBlock, array) {
  displayBlock.textContent = "";
  for (i = 0; i < array.length; i++) {
    displayBlock.textContent += array[i];
  }
}

function equalFn() {
  if (operandtoggle === false) {
    operatorAllow = true;
    plusNegativeAllow = true;

    decimalAllow = true;
    numeratorBlock = true;
    if (isNaN(mathExpression[0]) && mathExpression.length === 3) {
      temp_number = resultInput.textContent;
      mathExpression.push(Number(temp_number));
      displayArray(textDisplay1, mathExpression);
      temp_number = "";
    } else if (!isNaN(mathExpression[0]) && mathExpression.length === 2) {
      temp_number = resultInput.textContent;
      mathExpression.push(Number(temp_number));
      displayArray(textDisplay1, mathExpression);
      temp_number = "";
    }

    if (isNaN(mathExpression[0]) && mathExpression.length === 4) {
      mathExpression[1] = Number(mathExpression[0] + mathExpression[1]);

      mathExpression.shift();
      bodyID.classList.add("display-result");
      calculatorFn(resultInput);
      mathExpression = [];
    } else if (!isNaN(mathExpression[0]) && mathExpression.length === 3) {
      bodyID.classList.add("display-result");
      calculatorFn(resultInput);
      mathExpression = [];
    }
  }
}

function plusNegative(e) {
  if (plusNegativeAllow === true) {
    if (plusNegativeToggle === true) {
      if (
        (resultInput.textContent === " " || resultInput.textContent === "+") &&
        resultInput.textContent !== "-"
      ) {
        resultInput.textContent = "−";
      } else if (
        operandtoggle === false &&
        !resultInput.textContent.includes("-") &&
        !resultInput.textContent.includes("+")
      ) {
        resultInput.textContent = "-" + resultInput.textContent;
      } else if (
        operandtoggle === false &&
        resultInput.textContent.includes("+")
      ) {
        resultInput.textContent = resultInput.textContent.replace("+", "-");
      }
      plusNegativeToggle = false;
      temp_operator = "-";
      decimalAllow = true;
    } else {
      if (resultInput.textContent === "−" && resultInput.textContent !== "+") {
        resultInput.textContent = "+";
      } else if (
        operandtoggle === false &&
        resultInput.textContent.includes("-")
      ) {
        resultInput.textContent = resultInput.textContent.replace("-", "+");
      }
      plusNegativeToggle = true;
      temp_operator = "+";
      decimalAllow = true;
    }
  }
}

function backSpacer(e) {
  resultInput.textContent = resultInput.textContent.slice(
    0,
    resultInput.textContent.length - 1
  );
}

function numeratorFn(e) {
  numeratorAllow = true;
  plusNegativeAllow = true;
  bodyID.classList.remove("display-result");
  //the result screen has to be wiped only once before new numerator input, the boolean check toggle ensures that
  if (operandtoggle === true) {
    resultInput.textContent = "";
    operandtoggle = false;
    decimalAllow = true;
  }

  if (numeratorAllow === true && numeratorBlock === false) {
    resultInput.textContent += e.target.innerText;
    if (temp_operator != "") {
      mathExpression.push(temp_operator);
      temp_operator = "";
      bodyID.classList.remove("display-result");
      bodyID.classList.remove("text-display-1");
    }
    displayArray(textDisplay1, mathExpression);
    operatorAllow = true;
  }
}

function operatorFn(e) {
  //push method for the number string shold only run once when/after..
  //the operator is pressed
  if (operatorAllow === true && temp_operator != e.target.innerText) {
    plusNegativeAllow = false;
    numeratorBlock = false;
    bodyID.classList.remove("display-result");
    //temp number would be pushed only once after the operator input.
    if (operandtoggle === false) {
      temp_number = resultInput.textContent;
      if (isNaN(temp_number) === false) {
        if (temp_number.length > 20) {
          mathExpression.push(Number(temp_number).toExponential(10));
        } else {
          mathExpression.push(Number(temp_number));
        }
      } else {
        clearScreen();
      }
      decimalAllow = true;
    }
    if (e.target.innerText === "−") {
      resultInput.textContent = "-";
      temp_operator = "-";
    } else {
      resultInput.textContent = e.target.innerText;
      temp_operator = e.target.innerText;
    }

    displayArray(textDisplay1, mathExpression);

    numeratorAllow = true;
    operandtoggle = true;

    if (isNaN(mathExpression[0]) && mathExpression.length === 4) {
      mathExpression[1] = Number(mathExpression[0] + mathExpression[1]);
      screenShift();
      mathExpression.shift();
      calculatorFn(textDisplay1);
      bodyID.classList.add("text-display-1");
    } else if (!isNaN(mathExpression[0]) && mathExpression.length === 3) {
      screenShift();
      calculatorFn(textDisplay1);
      bodyID.classList.add("text-display-1");
    }
  }
}

function calculatorFn(displaySlot) {
  let targetOperator = mathExpression[1];
  switch (targetOperator) {
    case "-":
      mathExpression[0] = mathExpression[0] - mathExpression[2];
      if (
        isNaN(mathExpression[0]) === true ||
        mathExpression[0] === undefined
      ) {
        clearScreen();
        textDisplay4.textContent = "malformed expression";
      }

      if (mathExpression[0] < 0) {
        mathExpression[0] = mathExpression[0].toFixed(2);
      }
      if (
        displaySlot === resultInput &&
        mathExpression[0].toString().length > 13
      ) {
        mathExpression = [mathExpression[0].toExponential(7)];
      } else mathExpression = [mathExpression[0]];
      displayArray(displaySlot, mathExpression);
      break;
    case "x":
      mathExpression[0] = mathExpression[0] * mathExpression[2];
      if (
        isNaN(mathExpression[0]) === true ||
        mathExpression[0] === undefined
      ) {
        clearScreen();
        textDisplay4.textContent = "malformed expression";
      }
      if (mathExpression[0] < 0) {
        mathExpression[0] = mathExpression[0].toFixed(2);
      }
      if (
        displaySlot === resultInput &&
        mathExpression[0].toString().length > 13
      ) {
        mathExpression = [mathExpression[0].toExponential(7)];
      } else mathExpression = [mathExpression[0]];
      displayArray(displaySlot, mathExpression);
      break;
    case "÷":
      mathExpression[0] = mathExpression[0] / mathExpression[2];
      if (
        isNaN(mathExpression[0]) === true ||
        mathExpression[0] === undefined
      ) {
        clearScreen();
        textDisplay4.textContent = "malformed expression";
      }
      if (mathExpression[0] < 0) {
        mathExpression[0] = mathExpression[0].toFixed(2);
      }
      if (
        displaySlot === resultInput &&
        mathExpression[0].toString().length > 13
      ) {
        mathExpression = [mathExpression[0].toExponential(7)];
      } else mathExpression = [mathExpression[0]];
      displayArray(displaySlot, mathExpression);
      break;
    case "−":
      mathExpression[0] = mathExpression[0] - mathExpression[2];
      if (
        isNaN(mathExpression[0]) === true ||
        mathExpression[0] === undefined
      ) {
        clearScreen();
        textDisplay4.textContent = "malformed expression";
      }
      if (mathExpression[0] < 0) {
        mathExpression[0] = mathExpression[0].toFixed(2);
      }
      if (
        displaySlot === resultInput &&
        mathExpression[0].toString().length > 13
      ) {
        mathExpression = [mathExpression[0].toExponential(7)];
      } else mathExpression = [mathExpression[0]];
      displayArray(displaySlot, mathExpression);
      break;
    case "+":
      mathExpression[0] = mathExpression[0] + mathExpression[2];
      if (
        isNaN(mathExpression[0]) === true ||
        mathExpression[0] === undefined
      ) {
        clearScreen();
        textDisplay4.textContent = "malformed expression";
      }
      if (mathExpression[0] < 0) {
        mathExpression[0] = mathExpression[0].toFixed(2);
      }
      if (
        displaySlot === resultInput &&
        mathExpression[0].toString().length > 13
      ) {
        mathExpression = [mathExpression[0].toExponential(7)];
      } else mathExpression = [mathExpression[0]];
      displayArray(displaySlot, mathExpression);
      break;
  }
}

function screenShift() {
  textDisplay4.textContent = textDisplay3.textContent;
  textDisplay3.textContent = textDisplay2.textContent;
  textDisplay2.textContent = textDisplay1.textContent;
}

function decimalOperation(e) {
  if (decimalAllow === true && numeratorAllow === true) {
    resultInput.textContent += e.target.innerText;
    if (temp_operator != "") {
      mathExpression.push(temp_operator);
      temp_operator = "";
    }
    displayArray(textDisplay1, mathExpression);
    operatorAllow = true;
    decimalAllow = false;
    plusNegativeAllow = false;
  }
}
