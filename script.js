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

const operatorObjects = document.getElementsByClassName("operator");

const plusNegetiveButton = document.getElementById("plus-negative");

const resultInput = document.getElementById("result");

const backSpaceBtn = document.getElementById("backspace");

let operatorAllow = false;
let numeratorAllow = false;
let operandtoggle = true;
let plusNegativeAllow = true;
let plusNetativeToggle = true;

let temp_operator = "";
let temp_number = "";
let mathExpression = [];

plusNegetiveButton.addEventListener("click", plusNegative);

backSpaceBtn.addEventListener("click", backSpacer);

Array.from(numericKeys).forEach((element) =>
  element.addEventListener("click", numeratorFn)
);

Array.from(operatorObjects).forEach((element) =>
  element.addEventListener("click", operatorFn)
);

function displayArray(displayBlock, array) {
  displayBlock.textContent = "";
  for (i = 0; i < array.length; i++) {
    displayBlock.textContent += array[i];
  }
}

function plusNegative(e) {
  if (plusNegativeAllow === true) {
    if (plusNetativeToggle === true) {
      resultInput.textContent = "−";
      plusNetativeToggle = false;
      temp_operator = "-";
    } else {
      resultInput.textContent = "+";
      plusNetativeToggle = true;
      temp_operator = "+";
    }
  }
}

function backSpacer(e) {
  resultInput.textContent = textDisplay1.textContent;
  textDisplay1.textContent = "";
  temp_number = "";
  temp_operator = "";
  mathExpression.pop();
  displayArray(resultInput, mathExpression);
}

function numeratorFn(e) {
  numeratorAllow = true;
  plusNegativeAllow = false;

  //the result screen has to be wiped only once before new numerator input, the boolean check toggle ensures that
  if (operandtoggle === true) {
    resultInput.textContent = "";
    operandtoggle = false;
  }

  if (numeratorAllow === true) {
    resultInput.textContent += e.target.innerText;
    if (temp_operator != "") {
      mathExpression.push(temp_operator);
      temp_operator = "";
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

    //temp number would be pushed only once after the operator input.
    if (operandtoggle === false) {
      temp_number = resultInput.textContent;
      mathExpression.push(temp_number);
    }
    resultInput.textContent = e.target.innerText;
    temp_operator = e.target.innerText;

    displayArray(textDisplay1, mathExpression);

    numeratorAllow = true;
    operandtoggle = true;
  }
}
