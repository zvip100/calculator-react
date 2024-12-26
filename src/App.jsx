import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { calculator, numbers, operators } from "./calculator";
import "./App.css";

function App() {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showSelectedNums, setShowSelectedNums] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  console.log(firstNumber);
  console.log(selectedOperator);

  function handleNumberClick(num) {
    if (!selectedOperator) {
      if (firstNumber) setFirstNumber(firstNumber + num);
      else setFirstNumber(num);
    } else {
      if (secondNumber) setSecondNumber(secondNumber + num);
      else setSecondNumber(num);
    }

    console.log("first: ", firstNumber);
    console.log("second: ", secondNumber);

    setShowSelectedNums(true);
  }

  function addDecimalPoint(number, setNumber) {
    let num = Number.parseInt(number);
    let fixedNum = num.toFixed(2);
    let sub = fixedNum.substring(0, fixedNum.length - 2);
    console.log(sub);
    setNumber(sub);
  }

  function calculate() {
    if (!secondNumber) return;

    let configureOperator;

    switch (selectedOperator) {
      case "+":
        configureOperator = calculator.add;
        break;
      case "-":
        configureOperator = calculator.subtract;
        break;
      case "*":
        configureOperator = calculator.multiply;
        break;
      case "/":
        configureOperator = calculator.divide;
    }
    setResult(configureOperator(firstNumber, secondNumber));

    setShowResult(true);
  }

  function clearInput() {
    setShowSelectedNums(false);
    setResult(false);
    setShowResult(false);
    setFirstNumber(null);
    setSecondNumber(null);
    setSelectedOperator(null);
  }

  return (
    <>
      <h1 className="title">Zvi's Calculator App</h1>
      {showSelectedNums && (
        <div style={{ display: "inline-block" }}>
          <h3 style={{ display: "inline-block" }}>{firstNumber}</h3>{" "}
          {selectedOperator && (
            <h3 style={{ display: "inline-block" }}> {selectedOperator} </h3>
          )}{" "}
          {secondNumber && (
            <h3 style={{ display: "inline-block" }}>{secondNumber}</h3>
          )}
        </div>
      )}{" "}
      {showResult && (
        <>
          <h3 style={{ display: "inline-block" }}> = </h3>
          <h2>{result}</h2>
        </>
      )}
      <div className="calculator-body">
        <div className="numbers">
          {numbers.map((number, index) => (
            <button
              type="button"
              key={index}
              className="number-btn"
              value={number}
              onClick={(event) => handleNumberClick(event.target.value)}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            className="number-btn"
            onClick={() => {
              if (!selectedOperator && firstNumber) {
                addDecimalPoint(firstNumber, setFirstNumber);
              } else if (selectedOperator && secondNumber) {
                addDecimalPoint(secondNumber, setSecondNumber);
              }
            }}
          >
            .
          </button>

          <button type="button" className="number-btn" onClick={clearInput}>
            Clear
          </button>
        </div>

        <div className="operators">
          {operators.map((operator, index) => (
            <button
              type="button"
              key={index}
              className="operator-btn"
              value={operator}
              onClick={(event) => setSelectedOperator(event.target.value)}
            >
              {operator}
            </button>
          ))}
          <button type="button" className="operator-btn" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
