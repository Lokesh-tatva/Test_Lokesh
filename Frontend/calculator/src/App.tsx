
import { useState } from "react";
import "./App.css";

type Operator = "+" | "-" | "*" | "/";

function App() {
  const [display, setDisplay] = useState<string>("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [newNumber, setNewNumber] = useState<boolean>(false);

  const handleNumber = (num: string) => {
    if (newNumber || display === "Error") {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber || display === "Error") {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op: Operator) => {
    if (display === "Error") return;
    setFirstNumber(Number(display));
    setOperator(op);
    setNewNumber(true);
  };

  const handleCalculate = () => {
    if (firstNumber === null || operator === null || newNumber) {
      return;
    }

    const secondNumber = Number(display);
    let result: number;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
    }

    if (!Number.isFinite(result)) {
      setDisplay("Error");
    } else {
      setDisplay(String(Number(result.toPrecision(12))));
    }

    setFirstNumber(null);
    setOperator(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setNewNumber(false);
  };

  const handleDelete = () => {
    if (display === "Error" || newNumber) {
      setDisplay("0");
      setNewNumber(false);
      return;
    }

    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h2>Simple Calculator</h2>

        <div className="display">{display}</div>

        <div className="button-grid">
          <button className="clear" onClick={handleClear}>AC</button>
          <button onClick={handleDelete}>DEL</button>
          <button className="operator" onClick={() => handleOperator("/")}>÷</button>
          <button className="operator" onClick={() => handleOperator("*")}>×</button>

          <button onClick={() => handleNumber("7")}>7</button>
          <button onClick={() => handleNumber("8")}>8</button>
          <button onClick={() => handleNumber("9")}>9</button>
          <button className="operator" onClick={() => handleOperator("-")}>−</button>

          <button onClick={() => handleNumber("4")}>4</button>
          <button onClick={() => handleNumber("5")}>5</button>
          <button onClick={() => handleNumber("6")}>6</button>
          <button className="operator" onClick={() => handleOperator("+")}>+</button>

          <button onClick={() => handleNumber("1")}>1</button>
          <button onClick={() => handleNumber("2")}>2</button>
          <button onClick={() => handleNumber("3")}>3</button>
          <button className="equal" onClick={handleCalculate}>=</button>

          <button className="zero" onClick={() => handleNumber("0")}>0</button>
          <button onClick={handleDecimal}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
