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

console.log(numbers);

export const operators = ["+", "-", "*", "/"];
