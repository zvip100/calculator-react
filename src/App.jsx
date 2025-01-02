import { useState } from "react";
import calculator_logo from "./assets/calculator.svg";
import { calculator, numbers, operators } from "./calculator";
import "./App.css";

function App() {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showSelectedNums, setShowSelectedNums] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [disableNumBtn, setDisableNumBtn] = useState(false);

  console.log(firstNumber);
  console.log(selectedOperator);

  function handleNumberClick(num) {
    if (disableNumBtn) {
      clearInput();
      setFirstNumber(num);
      setShowSelectedNums(true);
      return;
    }

    if (result) {
      setResult(null);
      setSecondNumber(num);
      setShowSelectedNums(true);
      return;
    }

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

  function calculate(disable) {
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

    const calculateNum = configureOperator(firstNumber, secondNumber);

    let finalNum;

    if (calculateNum.includes(".00")) {
      finalNum = calculateNum.substring(0, calculateNum.length - 3);
    } else finalNum = calculateNum;

    setResult(finalNum);
    setShowResult(true);

    if (disable) setDisableNumBtn(true);

    return finalNum;
  }

  function clearInput() {
    setShowSelectedNums(false);
    setResult(null);
    setShowResult(false);
    setFirstNumber(null);
    setSecondNumber(null);
    setSelectedOperator(null);
    setDisableNumBtn(false);
  }

  return (
    <>
      <img src={calculator_logo} alt="Calculator icon" className="logo"></img>

      <h1 className="title">Zvi's Calculator App</h1>

      <div className="result">
        {showSelectedNums ? (
          <>
            <h3>{firstNumber}</h3>{" "}
            {selectedOperator && <h3> {selectedOperator} </h3>}{" "}
            {secondNumber && <h3>{secondNumber}</h3>}{" "}
          </>
        ) : null}

        {showResult && (
          <>
            <h3> = </h3>
            <h2>{result}</h2>
          </>
        )}
      </div>

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
              if (disableNumBtn) return;

              if (!selectedOperator && firstNumber) {
                addDecimalPoint(firstNumber, setFirstNumber);
              } else if (selectedOperator && secondNumber) {
                addDecimalPoint(secondNumber, setSecondNumber);
              }
            }}
          >
            .
          </button>

          <button
            type="button"
            className="number-btn clear-btn"
            onClick={clearInput}
          >
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
              onClick={(event) => {
                if (!firstNumber) return;

                setSelectedOperator(event.target.value);

                if (secondNumber && !result) {
                  const num = calculate(false);
                  setFirstNumber(num);
                  setSecondNumber(null);
                  setShowResult(false);
                  return;
                }

                if (result) {
                  let num = Number.parseFloat(result);
                  setFirstNumber(num);
                  setSecondNumber(null);
                  setShowResult(false);
                  setDisableNumBtn(false);
                }
              }}
            >
              {operator}
            </button>
          ))}
          <button
            type="button"
            className="equals-btn"
            onClick={() => calculate(true)}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
