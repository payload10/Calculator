// CALCULATOR LOGIC:

"use strict";

class Calculator{

    /* let previousValue = "";
    let currentValue = "";
    let operation = undefined; */

    constructor(previousValueTextElement, currentValueTextElement) {

        this.previousValue = "";
        this.currentValue = "";
        this.operation = undefined;
        this.previousValueTextElement = previousValueTextElement;
        this.currentValueTextElement = currentValueTextElement;
    }

    // Clear everything in the output
    allClear() {

        this.previousValue = "";
        this.currentValue = "";
        this.operation = undefined;
    }

    // Reomve a number when press DEL
    deleteNumber() {

        this.currentValue = this.currentValue.toString().slice(0,-1);
    }

    // Append a number
    appendNumber(number) {

        if (number === '.' && this.currentValue.includes('.')) {
            return; 
        }

        this.currentValue = this.currentValue.toString() + number.toString();
    }

    // Calculate the value according to the operand selected
    compute() {

        let computation;

        // Convert the numbers from string to number again
        let curr = parseFloat((this.currentValue));
        let prev = parseFloat((this.previousValue));

        if(isNaN(curr) || isNaN(prev)) {

            return;
        }

        switch(this.operation) {

            case "+": computation = curr + prev;
                      break;

            case "-": computation = curr - prev;
                      break;

            case "*": computation = curr * prev;
                      break;

            case "/": computation = prev / curr;
                      break;

            default : return;
        }

        this.currentValue = computation;
        this.previousValue = "";
        this.operation = undefined;
    }

    // User clicks on any one of the operation button i.e +,-,*,/
    chooseOperation(operation) {

        if(this.currentValue === "") {

            return;
        }

        if(this.previousValue != ""){

            this.compute();
        }

        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = "";
        this.previousValueTextElement.innerText = this.previousValue;
    }

    updateDisplay() {

        if(this.operation === undefined) {

            this.operation = "";
        }
        this.previousValueTextElement.innerText = this.previousValue + " " + this.operation;
        this.currentValueTextElement.innerText = this.currentValue;
    }


};

const previousValueTextElement = document.querySelector(".previous-operand");
console.log(previousValueTextElement)
const currentValueTextElement = document.querySelector(".current-operand");
console.log(currentValueTextElement)
const buttons = document.querySelectorAll(".button");
console.log(buttons)
const allClear = document.querySelector(".allClear");
const operationButtons = document.querySelectorAll(".operation-button");
const equals = document.querySelector(".equals");
const deleteNumber = document.querySelector(".delete");


// Calculator Object
const calculator = new Calculator(previousValueTextElement, currentValueTextElement);


// For Button 0 to 9 including .
buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    }, false);
});

// All Clear
allClear.addEventListener("click", (event) => {

    calculator.allClear();
    calculator.updateDisplay();

}, false);

// Delete
deleteNumber.addEventListener("click", (event) => {

    calculator.deleteNumber();
    calculator.updateDisplay();

}, false);

// For operation buttons
operationButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    }, false);
});

// Compute
equals.addEventListener("click", (event) => {

    calculator.compute();
    calculator.updateDisplay();

}, false);

