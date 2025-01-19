import plus_icon from "./assets/plus.svg";
import minus_icon from "./assets/minus.svg";
import multiplication_icon from "./assets/multiplication.svg";
import division_icon from "./assets/division.svg";

export const calculator = {
  add: (a, b) => {
    let result = Number.parseFloat(a) + Number.parseFloat(b);
    return result.toFixed(2);
  },

  subtract: (a, b) => {
    let result = a - b;
    return result.toFixed(2);
  },

  multiply: (a, b) => {
    let result = a * b;
    return result.toFixed(2);
  },

  divide: (a, b) => {
    let result = a / b;
    return result.toFixed(2);
  },
};

export const numbers = [];

for (let i = 1; i < 10; i++) {
  numbers.push(i);
}

numbers.push(0);

export const operators = ["+", "-", "*", "/"];

export const allValues = [...numbers, ...operators, "=", "."];

export const icons = [
  plus_icon,
  minus_icon,
  multiplication_icon,
  division_icon,
];


