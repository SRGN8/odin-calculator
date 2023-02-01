// GLOBAL VARS
let numCheck = false;
const operatorDetector = /[\W_]/g;
const numDetector = /\d/;
let equationCont = [];
let equationResult;
let eCounter = 0;
let digitCounter = 0;

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
    screenSelector.value = "";
    return 1;
  }

  memory.innerHTML = `${screenSelector.value} = ${eval}`;
  mListSelector.prepend(memory);
  screenSelector.value = eval;
  return 0;
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
  // Operator Button Check
  if (
    numCheck &&
    this.innerHTML.match(operatorDetector) &&
    this.innerHTML != "=" &&
    this.innerHTML != "." &&
    this.innerHTML !== "+/-"
  ) {
    if (equationCont.length == 3) {
      evalEquation(equationCont);
      equationCont.length = 0;
      equationCont.push(equationResult);
      equationCont.push(this.innerHTML);
      numCheck = false;
      screenSelector.value = screenSelector.value + ` ${this.innerHTML} `;
      eCounter = 2;
      digitCounter = 0;
      console.log(equationCont);
    } else {
      numCheck = false;
      equationCont.push(this.innerHTML);
      eCounter += 2;
      digitCounter = 0;
      screenSelector.value = screenSelector.value + ` ${this.innerHTML} `;
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
          digitCounter++;
        }
      } else {
        equationCont.push(this.innerHTML);
        digitCounter++;
      }

      screenSelector.value = screenSelector.value + `${this.innerHTML}`;
    }
  }

  // Delete Button
  if (this.innerHTML == "DEL" && screenSelector.value != "") {
    let displayCopy = screenSelector.value;
    let opCheck = displayCopy.charAt(displayCopy.length - 1);
    let eContCopy = equationCont[eCounter];

    if (opCheck === " ") {
      screenSelector.value = displayCopy.slice(0, displayCopy.length - 3);
      equationCont[eCounter] = eContCopy.slice(0, -1);
    } else {
      screenSelector.value = displayCopy.slice(0, displayCopy.length - 1);
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

  //Evaluation Trigger
  if (this.innerHTML == "=" && screenSelector.value != "") {
    if (equationCont.length == 3 && equationCont[2] != "") {
      // Dont Divide By Zero...
      if (
        (equationCont[1] == "÷" && equationCont[0] == 0) ||
        equationCont[2] == 0
      ) {
        addMemory("divisionError");
        screenSelector.value = "";
        return 1;
      }

      evalEquation(equationCont);
      return 0;
    }
  }
}

buttonGen();
