const root = document.documentElement;

checkBox = document.querySelector('input[type="checkbox"]');

checkBox.addEventListener("click", toggleTheme);

function toggleTheme() {
  if (checkBox.checked == false) {
    root.className = "dark";
  } else root.className = "light";
}

/* 
    TODO: Make screen display numeric button press actions.
     todo   : Make logic accept math operators
     todo   : Make logic handle backspace, Cancel, and Ac button
*/

const numericKeys = document.getElementsByClassName("numeric");
const textDisplay1 = document.getElementById("input-1");
const textDisplay2 = document.getElementById("input-2");
const textDisplay3 = document.getElementById("input-3");
const textDisplay4 = document.getElementById("input-4");

test_array = new Array();

Array.from(numericKeys).forEach((element) =>
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.tagName.toLowerCase() === "span") {
      textDisplay1.textContent += e.target.textContent;
    } else textDisplay1.textContent += e.target.value;
  })
);
