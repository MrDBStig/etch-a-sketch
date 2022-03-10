"use strict";

// DEFAULT CONSTANTS AND VARIABLES
const DEFAULT_COLOR = "#222831",
  DEFAULT_MODE = "color",
  DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR,
  currentMode = DEFAULT_MODE,
  currentSize = DEFAULT_SIZE,
  mouseDown = false;

// SELECTORS
const gridContainer = document.querySelector(".grid-container"),
  colorPicker = document.querySelector(".color-picker"),
  colorBtn = document.querySelector(".color-btn"),
  rainbowBtn = document.querySelector(".rainbow-btn"),
  eraserBtn = document.querySelector(".eraser-btn"),
  clearBtn = document.querySelector(".clear-btn"),
  sizeValue = document.querySelector(".size-value"),
  sizeSlider = document.querySelector(".size-slider");

// EVENT HANDLERS

// Event ahndlers for mouse
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Event handlers for settings
colorPicker.addEventListener("change", (event) =>
  setCurrentColor(event.target.value)
);
colorBtn.addEventListener("click", () => setCurrentMode("color"));
rainbowBtn.addEventListener("click", () => setCurrentMode("rainbow"));
eraserBtn.addEventListener("click", () => setCurrentMode("eraser"));
clearBtn.addEventListener("click", () => reloadGrid());
sizeSlider.addEventListener("mousemove", (event) =>
  updateSizeValue(event.target.value)
);
sizeSlider.addEventListener("change", (event) =>
  changeSizeValue(event.target.value)
);

// HELPER FUNCTIONS

// Function for add/remove active class on btns
const activateButton = function (newMode) {
  // Removing active class
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  }
  if (currentMode === "color") {
    colorBtn.classList.remove("active");
  }
  if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  // Adding active class
  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  }
  if (newMode === "color") {
    colorBtn.classList.add("active");
  }
  if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
};

// Function for set up new color
const setCurrentColor = function (newColor) {
  currentColor = newColor;
};

// Function for set up new mode
const setCurrentMode = function (newMode) {
  activateButton(newMode);
  currentMode = newMode;
};

// Function for set up new size
const setCurrentSize = function (newSize) {
  currentSize = newSize;
};

// Function for change BG grid color
const changeColor = function (event) {
  if (event.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);
    event.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
  if (currentMode === "color") {
    event.target.style.backgroundColor = currentColor;
  }
  if (currentMode === "eraser") {
    event.target.style.backgroundColor = `#fff`;
  }
};

// Function for create grid elements
const setupGrid = function (size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    gridContainer.appendChild(gridElement);
  }
};

// Function for clear grid area
const clearGrid = function () {
  gridContainer.innerHTML = ``;
};

// Function for reload grid area
const reloadGrid = function () {
  clearGrid();
  setupGrid(currentSize);
};

// Function for update grid size values on page
const updateSizeValue = function (value) {
  sizeValue.innerHTML = `${value} x ${value}`;
};

// Function for change grid size values on grid area
const changeSizeValue = function (value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
};

// Function for reset settings on load/reload page
window.addEventListener("load", () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
});
