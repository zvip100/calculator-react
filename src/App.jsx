import { useState, useEffect } from "react";
import calculator_logo from "./assets/calculator.svg";
import delete_icon from "./assets/delete.svg";
import equals_icon from "./assets/equals.svg";
import { calculator, numbers, operators, allValues, icons } from "./calculator";
import "./App.css";

function App() {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showSelectedNums, setShowSelectedNums] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [disableNumBtn, setDisableNumBtn] = useState(false);
  const [keyValue, setKeyValue] = useState("");
  const [run, setRun] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyPressed = event.key;
      console.log(`Key pressed: ${keyPressed}`);

      if (
        keyPressed === "Enter" ||
        keyPressed === "Delete" ||
        keyPressed === "Backspace"
      ) {
        event.preventDefault();
        setKeyValue(keyPressed);
        setRun(true);
        return;
      }

      allValues.forEach((element) => {
        if (element == keyPressed) {
          console.log(element);
          console.log(typeof element);
          setKeyValue(keyPressed);
          setRun(true);
          return;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  (() => {
    if (run) {
      if (
        keyValue === "+" ||
        keyValue === "-" ||
        keyValue === "*" ||
        keyValue === "/"
      )
        handleOperatorClick(keyValue);
      else if (keyValue === "=" || keyValue === "Enter") {
        if (!firstNumber || !secondNumber) return;
        calculate(true);
      } else if (keyValue === ".") addDecimalPoint();
      else if (keyValue === "Delete") clearInput();
      else if (keyValue === "Backspace") deleteChar();
      else handleNumberClick(keyValue);

      setRun(false);
    }
  })();

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

    //console.log("first: ", firstNumber);
    //console.log("second: ", secondNumber);

    setShowSelectedNums(true);
    setShowDeleteBtn(true);
  }

  function addDecimalPoint() {
    if (disableNumBtn) return;

    const addDot = (number, setNumber) => {
      let WholeNum = Number.parseInt(number);
      let fixedNum = WholeNum.toFixed(2);
      let subNum = fixedNum.substring(0, fixedNum.length - 2);
      console.log(subNum);
      setNumber(subNum);
    };

    if (!selectedOperator && firstNumber) {
      if (firstNumber.includes(".")) return;
      addDot(firstNumber, setFirstNumber);
    } else if (selectedOperator && secondNumber) {
      if (secondNumber.includes(".")) return;
      addDot(secondNumber, setSecondNumber);
    }
  }

  function handleOperatorClick(operator) {
    if (!firstNumber) return;

    setSelectedOperator(operator);

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
    setShowDeleteBtn(false);
  }

  function deleteChar() {
    if (!firstNumber) return;

    let currentInput;
    let newInput;

    const removeChar = (number, setNumber) => {
      currentInput = number;

      try {
        newInput = currentInput.slice(0, -1);
        setNumber(newInput);
      } catch (e) {
        console.error(e);
      }
    };

    if (firstNumber && !selectedOperator) {
      if (firstNumber.length === 1) setShowDeleteBtn(false);
      removeChar(firstNumber, setFirstNumber);
    } else if (selectedOperator && !secondNumber) {
      setSelectedOperator(null);
    } else if (secondNumber && !result) {
      removeChar(secondNumber, setSecondNumber);
    } else {
      clearInput();
    }
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

        {showDeleteBtn && (
          <div className="delete-btn">
            <button type="button" className="operator-btn" onClick={deleteChar}>
              <img src={delete_icon} width="40px" height="40px"></img>
            </button>
          </div>
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
            onClick={addDecimalPoint}
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
                handleOperatorClick(event.target.value);
              }}
            >
              <img src={icons[index]} width="15px" height="15px"></img>
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
