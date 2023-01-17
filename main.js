// GLOBAL VARS
let tempCounter = 0;
let decimalCheck = 0;

// PROJECT CONTAINER
const body = document.querySelector("body");
const container = document.createElement("div");
container.id = "container";
body.appendChild(container);
const contSelector = document.getElementById("container");

// CALCULATOR BUTTONS
const calcButtons = [
  {
    name: "modulus",
    value: "%",
  },
  {
    name: "clear_everything",
    value: "CE",
  },
  {
    name: "clear",
    value: "C",
  },
  {
    name: "delete",
    value: "DEL",
  },
  {
    name: "reciprocal",
    value: "	&#8543x",
  },
  {
    name: "squared",
    value: "x^2",
  },
  {
    name: "square_root",
    value: "&#8730",
  },
  {
    name: "division",
    value: "÷",
  },
  {
    name: "7",
    value: 7,
  },
  {
    name: "8",
    value: 8,
  },
  {
    name: "9",
    value: 9,
  },
  {
    name: "multiplication",
    value: "×",
  },
  {
    name: "4",
    value: 4,
  },
  {
    name: "5",
    value: 5,
  },
  {
    name: "6",
    value: 6,
  },
  {
    name: "subtraction",
    value: "-",
  },
  {
    name: "1",
    value: 1,
  },
  {
    name: "2",
    value: 2,
  },
  {
    name: "3",
    value: 3,
  },
  {
    name: "addition",
    value: "+",
  },
  {
    name: "positive_negative",
    value: "+/-",
  },
  {
    name: "0",
    value: 0,
  },
  {
    name: "decimal",
    value: ".",
  },
  {
    name: "evaluate",
    value: "=",
  },
];

// BASIC MATH OPERATIONS
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

// OPERATE FUNCTION

function operate(op, a, b) {
  console.log(op);
  if (op == add) {
    return add(a, b);
  }
}

// CREATE CALCULATOR
const calculator = document.createElement("div");
calculator.classList.add("calculator");
contSelector.appendChild(calculator);
const calcSelector = document.querySelector(".calculator");

// CALCULATOR DISPLAY & SCREEN
const display = document.createElement("div");
const screen = document.createElement("input");
display.classList.add("display");
screen.classList.add("screen");
screen.type = "text";
screen.disabled = true;
// screen.value = "test";
display.appendChild(screen);
calcSelector.appendChild(display);
const screenSelector = document.querySelector(".screen");

// CALCULATOR MEMORY ELEMENTS
const memCont = document.createElement("div");
memCont.classList.add("memCont");
const memHead = document.createElement("div");
memHead.classList.add("memHead");
const memName = document.createElement("div");
memName.classList.add("memName");
memName.innerHTML = "MEMORY";
const memClear = document.createElement("div");
memClear.classList.add("memClear");
memClear.innerHTML = "CLEAR";
const memDisplay = document.createElement("div");
memDisplay.classList.add("memDisplay");
const memList = document.createElement("ul");
memList.classList.add("memList");
memDisplay.appendChild(memList);
memHead.appendChild(memName);
memHead.appendChild(memClear);
memCont.appendChild(memHead);
memCont.appendChild(memDisplay);
contSelector.appendChild(memCont);
const mListSelector = document.querySelector(".memList");

/*

TODO

- add in the functionallity for calc

- give buttons click effects

- style the scrollbar for div

# Make Memory DIV scrollable
-https://www.w3docs.com/snippets/css/how-to-make-a-div-vertically-scrollable.html


*/

// CALCULATOR CONTROLS
const controls = document.createElement("div");
controls.classList.add("controls");
calcSelector.appendChild(controls);
const ctrlSelect = document.querySelector(".controls");

// CALCULATOR BUTTON GENERATOR FUNCTION
function buttonGen() {
  for (i in calcButtons) {
    const button = document.createElement("div");
    button.classList.add("button");
    button.classList.add(calcButtons[i].name);
    button.id = calcButtons[i].name;
    button.innerHTML = calcButtons[i].value;
    button.addEventListener("click", buttonPressEvent);
    ctrlSelect.appendChild(button);
    // console.log(i);
  }

  return 0;
}

// BUTTON PRESS EVENT
function buttonPressEvent() {
  // const memory = document.createElement("li");
  // memory.innerHTML = `Append #${tempCounter}`;
  // mListSelector.prepend(memory);
  // tempCounter++;
  console.log(this.innerHTML);
  screenSelector.value = screenSelector.value + `${this.innerHTML}`;
}

buttonGen();
