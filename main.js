// GLOBAL VARS
let numCheck = false;
const operatorDetector = /[\W_]/g;
const numDetector = /\d/;
let equationCont = [];
let equationResult;
let eCounter = 0;
let digitCounter = 0;
let commaPos = 1;
let addComma = 0;

// PROJECT CONTAINER
const body = document.querySelector("body");
const container = document.createElement("div");
container.id = "container";
body.appendChild(container);
const contSelector = document.getElementById("container");

// CALCULATOR BUTTONS
const calcButtons = [
  {
    name: "percentage",
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
    value: "	&#8543&#x2093",
  },
  {
    name: "squared",
    value: "&#x78&#xb2",
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

// CREATE CALCULATOR
const calculator = document.createElement("div");
calculator.classList.add("calculator");
contSelector.appendChild(calculator);
const calcSelector = document.querySelector(".calculator");

// CALCULATOR DISPLAY & SCREEN
const display = document.createElement("div");
const screen = document.createElement("div");
const inputField = document.createElement("input");
const eqMemory = document.createElement("input");
display.classList.add("display");
screen.classList.add("screen");
inputField.classList.add("inputField");
eqMemory.classList.add("eqMemory");
eqMemory.type = "text";
inputField.type = "text";
eqMemory.disabled = true;
inputField.disabled = true;
// screen.value = "test";
screen.appendChild(eqMemory);
screen.appendChild(inputField);
display.appendChild(screen);
calcSelector.appendChild(display);
const inputFieldSelector = document.querySelector(".inputField");
const eqMemorySelector = document.querySelector(".eqMemory");

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

// CALCULATOR CONTROLS
const controls = document.createElement("div");
controls.classList.add("controls");
calcSelector.appendChild(controls);
const ctrlSelect = document.querySelector(".controls");

// ADD TO MEMORY
function addMemory(eval) {
  const memory = document.createElement("li");
  memory.classList.add("memory");

  if (eval == "divisionError") {
    memory.innerHTML = `You tried to Divide By 0... STAHP! NOOOO-!`;
    mListSelector.prepend(memory);
    inputFieldSelector.value = "";
    return 1;
  }

  if (eCounter == 2) {
    memory.innerHTML = `${equationCont[0]} ${equationCont[1]} ${equationCont[2]} = ${eval}`;
    mListSelector.prepend(memory);
    inputFieldSelector.value = eval;
    return 0;
  }
}

// EQUATION EVALUATION FUNCTION
function evalEquation(arr) {
  const a = arr[0];
  const b = arr[1];
  const c = arr[2];
  let result;

  // BASIC MATH OPERATIONS
  function multiply(a, b) {
    result = parseInt(a) * parseInt(b);
    addMemory(result);
    equationResult = result;
    return 0;
  }

  function divide(a, b) {
    result = parseInt(a) / parseInt(b);
    addMemory(result);
    equationResult = result;
    return 0;
  }

  function add(a, b) {
    result = parseInt(a) + parseInt(b);
    addMemory(result);
    equationResult = result;
    return 0;
  }

  function subtract(a, b) {
    result = parseInt(a) - parseInt(b);
    addMemory(result);
    equationResult = result;
    return 0;
  }

  if (b == "×") {
    result = multiply(a, c);
  }

  if (b == "÷") {
    result = divide(a, c);
  }

  if (b == "+") {
    result = add(a, c);
  }

  if (b == "-") {
    result = subtract(a, c);
  }
}

function getPercentage() {
  if (equationCont.length == 3 && equationCont[2] != "") {
    inputFieldSelector.value = "";
    equationCont[2] = String((equationCont[0] * equationCont[2]) / 100);
    inputFieldSelector.value = equationCont[2];
    digitCounter = equationCont[2].length;
  } else {
    inputFieldSelector.value = "";
    equationCont[0] = "0";
    digitCounter = 1;
    inputFieldSelector.value = "0";
    console.log("test");
  }

  console.log(equationCont);
}

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

// COMMA INSERT FUNCTION
function insertComma(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

// BUTTON PRESS EVENT
function buttonPressEvent() {
  console.log(this);
  // Operator Button Check
  if (
    numCheck &&
    this.innerHTML.match(operatorDetector) &&
    this.innerHTML != "=" &&
    this.innerHTML != "." &&
    this.innerHTML !== "+/-" &&
    this.innerHTML != "%" &&
    this.id != "squared" &&
    this.id != "square_root" &&
    this.id != "reciprocal"
  ) {
    if (equationCont.length == 3) {
      evalEquation(equationCont);
      equationCont.length = 0;
      equationCont.push(equationResult);
      equationCont.push(this.innerHTML);
      numCheck = false;
      eqMemorySelector.value = inputFieldSelector.value + ` ${this.innerHTML} `;
      inputFieldSelector.value = "";
      eCounter = 2;
      digitCounter = 0;
      commaPos = 1;
      addComma = 0;
      console.log(equationCont);
    } else {
      numCheck = false;
      equationCont.push(this.innerHTML);
      eCounter += 2;
      digitCounter = 0;
      commaPos = 1;
      addComma = 0;
      eqMemorySelector.value = inputFieldSelector.value + ` ${this.innerHTML} `;
      inputFieldSelector.value = "";
      console.log(equationCont);
    }
  }

  // Number Button Check
  if (this.innerHTML.match(numDetector)) {
    numCheck = true;

    if (digitCounter < 16) {
      if (equationCont.length >= 1) {
        if (equationCont[eCounter] == undefined) {
          equationCont[eCounter] = this.innerHTML;
          digitCounter++;
        } else {
          equationCont[eCounter] = equationCont[eCounter] + this.innerHTML;
          console.log(equationCont[eCounter].length);
          digitCounter++;
        }
      } else {
        equationCont.push(this.innerHTML);
        digitCounter++;
      }

      inputFieldSelector.value = inputFieldSelector.value + `${this.innerHTML}`;
      addComma++;
      console.log(equationCont);
      if (addComma == 4) {
        inputFieldSelector.value = insertComma(
          inputFieldSelector.value,
          commaPos,
          ","
        );
        commaPos += 4;
        addComma = 1;
      }
    }
  }

  // Delete Button
  if (this.innerHTML == "DEL" && inputFieldSelector.value != "") {
    let displayCopy = inputFieldSelector.value;
    let opCheck = displayCopy.charAt(displayCopy.length - 1);
    let eContCopy = equationCont[eCounter];

    if (opCheck === " ") {
      inputFieldSelector.value = displayCopy.slice(0, displayCopy.length - 3);
      equationCont[eCounter] = eContCopy.slice(0, -1);
    } else {
      inputFieldSelector.value = displayCopy.slice(0, displayCopy.length - 1);
      equationCont[eCounter] = eContCopy.slice(0, -1);
      digitCounter--;
    }

    if (equationCont[eCounter].length == 0) {
      equationCont.length -= 1;
      if (eCounter > 0) {
        eCounter--;
      }
    }
  }

  // Clear (C) Button
  if (this.innerHTML == "C" && inputFieldSelector.value != "") {
    inputFieldSelector.value = "";
    equationCont.length -= 1;
    digitCounter = 0;
    addComma = 0;
    commaPos = 1;
  }

  // Clear Everything (CE) Button
  if (this.innerHTML == "CE" && inputFieldSelector.value != "") {
    inputFieldSelector.value = "";
    eqMemorySelector.value = "";
    equationCont.length -= equationCont.length;
    digitCounter = 0;
    addComma = 0;
    eCounter = 0;
    commaPos = 1;
  }

  // Percentage Trigger
  if (this.innerHTML == "%" && inputFieldSelector.value != "") {
    getPercentage();
  }

  // Squared Trigger
  if (this.id == "squared" && inputFieldSelector.value != "") {
    console.log("OK");
    let squared = String(equationCont[eCounter] * equationCont[eCounter]);
    equationCont[eCounter] = squared;
    inputFieldSelector.value = "";
    inputFieldSelector.value = squared;
    console.log(equationCont);
  }

  // Square Root Trigger
  if (this.id == "square_root" && inputFieldSelector.value != "") {
    let squareRoot = Math.sqrt(equationCont[eCounter]);
    squareRoot = String(squareRoot);
    equationCont[eCounter] = squareRoot;
    inputFieldSelector.value = "";
    inputFieldSelector.value = squareRoot;
    console.log(equationCont);
  }

  // Reciprocal Trigger
  if (this.id == "reciprocal" && inputFieldSelector.value != "") {
    let reciprocal = 1 / equationCont[eCounter];
    reciprocal = String(reciprocal.toFixed(6));
    equationCont[eCounter] = reciprocal;
    inputFieldSelector.value = "";
    inputFieldSelector.value = reciprocal;
    console.log(equationCont);
  }

  //Evaluation Trigger
  if (this.innerHTML == "=" && inputFieldSelector.value != "") {
    if (equationCont.length == 3 && equationCont[2] != "") {
      // Dont Divide By Zero...
      if (
        (equationCont[1] == "÷" && equationCont[0] == 0) ||
        equationCont[2] == 0
      ) {
        addMemory("divisionError");
        inputFieldSelector.value = "";
        eqMemorySelector.value = "";
        equationCont.length -= equationCont.length;
        eCounter = 0;
        addComma = 0;
        return 1;
      }

      evalEquation(equationCont);
      eqMemorySelector.value = "";
      eCounter = 0;
      addComma = 0;
      equationCont.length = equationCont.length - 2;
      digitCounter = equationCont[eCounter].length + 1;
      console.log(equationCont);
      return 0;
    }
  }
}

buttonGen();
