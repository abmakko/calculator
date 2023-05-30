const root = document.documentElement;

checkBox = document.querySelector('input[type="checkbox"]');

checkBox.addEventListener("click", toggleTheme);

function toggleTheme() {
  if (checkBox.checked == false) {
    root.className = "dark";
  } else root.className = "light";
}

/* 
   
     todo   : Make logic accept math operators
     todo   : Make logic handle backspace, Cancel, and Ac button
*/

const numericKeys = document.getElementsByClassName("numeric");
const textDisplay1 = document.getElementById("text-1");
const textDisplay2 = document.getElementById("text-2");
const textDisplay3 = document.getElementById("text-3");
const textDisplay4 = document.getElementById("text-4");

const operandObjects = document.getElementsByClassName("operand");

const resultInput = document.getElementById("result");

const backSpaceBtn = document.getElementById("backspace");

let operandToggle = true;
let minusNegetiveToggle = true;
let plusMinusCheck = true;
let repeatCheck = false;
let operatorSwitch = true;
let operandPusher = false;
let backspaceChecker = true;
let temp_operator = "";
let temp_number = "";
let mathExpression = [];

backSpaceBtn.addEventListener("click", backSpacer);

Array.from(numericKeys).forEach((element) =>
  element.addEventListener("click", numerator)
);

Array.from(operandObjects).forEach((element) =>
  element.addEventListener("click", operator)
);

function displayArray(displayBlock, array) {
  displayBlock.textContent = "";
  for (i = 0; i < array.length; i++) {
    displayBlock.textContent += array[i];
  }
}

function backSpacer(e) {
  if (backspaceChecker === true) {
    if (temp_operator != "" && operatorSwitch === false) {
      //operator
      mathExpression.push(temp_operator);
      temp_operator = "";
      temp_number = "";
      plusMinusCheck = false;
      backspaceChecker = false;
      operandToggle = false;
      plusMinusCheck = false;
      //textDisplay1.textContent += temp_operator;
      displayArray(textDisplay1, mathExpression);
      //resultInput.textContent = textDisplay1.textContent;
      displayArray(resultInput, mathExpression);
      textDisplay1.textContent = "";
    }

    if (temp_number != "" && operatorSwitch === true) {
      mathExpression.push(temp_number);
      temp_number = "";
      temp_operator = "";
      plusMinusCheck = false;
      operandToggle = true;
      repeatCheck = true;
      backspaceChecker = false;
      //textDisplay1.textContent += temp_number;
      displayArray(textDisplay1, mathExpression);
      //resultInput.textContent = textDisplay1.textContent;
      displayArray(resultInput, mathExpression);
      textDisplay1.textContent = "";
    }
  }
}

function numerator(e) {
  //push method for the operator, should only run once when/after the...
  //numerator is pressed
  if (temp_operator != "" && operatorSwitch === false) {
    mathExpression.push(temp_operator);
    plusMinusCheck = false;
    operatorSwitch = true;
  }

  if (operandToggle === true) {
    temp_number = "";
    temp_number += e.target.innerText;
    //textDisplay1.textContent += temp_operator;
    displayArray(textDisplay1, mathExpression);
    resultInput.textContent = "";
    resultInput.textContent += e.target.innerText;
    operandToggle = false;
    operatorSwitch = true;
    plusMinusCheck = false;
  } else {
    resultInput.textContent += e.target.innerText;
    temp_number += e.target.innerText;
    operatorSwitch = true;
    plusMinusCheck = false;
  }
}

function operator(e) {
  //push method for the number string shold only run once when/after..
  //the operator is pressed

  if (
    temp_number != "" &&
    operatorSwitch === true &&
    e.target.innerText != "±"
  ) {
    temp_number = Number(temp_number);
    mathExpression.push(temp_number);
    plusMinusCheck = false;
    operatorSwitch = false;
  }
  if (operandToggle === false && e.target.innerText != "±") {
    //textDisplay1.textContent += resultInput.textContent;
    displayArray(textDisplay1, mathExpression);
    resultInput.textContent = e.target.innerText;
    temp_operator = e.target.innerText;
    operandToggle = true;
    repeatCheck = true;
    operatorSwitch = false;
    plusMinusCheck = false;
  }

  if (
    repeatCheck == true &&
    temp_operator != e.target.textContent &&
    e.target.innerText != "±"
  ) {
    resultInput.textContent = e.target.innerText;
    temp_operator = e.target.innerText;
    operandToggle = true;
  }

  if (operandToggle === true && e.target.innerText === "√") {
    resultInput.textContent = e.target.innerText;
    temp_operator = e.target.innerText;
    operandToggle = true;
    operatorSwitch = false;
  }

  if (
    operandToggle === true &&
    e.target.innerText === "±" &&
    plusMinusCheck == true
  ) {
    if (minusNegetiveToggle === true) {
      resultInput.textContent = "−";
      temp_operator = "-";
      minusNegetiveToggle = false;
      operatorSwitch = false;
    } else {
      resultInput.textContent = "+";
      temp_operator = "+";
      minusNegetiveToggle = true;
      operatorSwitch = false;
    }
  }
}
