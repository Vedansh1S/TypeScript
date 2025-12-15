import React, { useEffect, useState } from "react";

type Operator = "+" | "-" | "*" | "/" | "=";
type Key = Operator | "." | "AC" | "⌫" | string;

const ops: Operator[] = ["+", "-", "*", "/", "="];

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Operator | null>(null);
  const [resetNext, setResetNext] = useState(false);

  /* ---------------- Core Logic ---------------- */

  const calculate = (a: number, b: number, operator: Operator): number => {
    switch (operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/":
        if (b === 0) throw new Error("Divide by zero");
        return a / b;
      case "=": return b;
    }
  };

  const inputDigit = (digit: string) => {
    if (resetNext) {
      setDisplay(digit);
      setResetNext(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleOperator = (nextOp: Operator) => {
    const current = parseFloat(display);

    if (prev !== null && op) {
      const result = calculate(prev, current, op);
      setDisplay(result.toString());
      setPrev(result);
    } else {
      setPrev(current);
    }

    setOp(nextOp);
    setResetNext(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setResetNext(false);
  };

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  /* ---------------- Unified Input ---------------- */

  const handleInput = (key: Key) => {
    if (!isNaN(Number(key))) inputDigit(key);
    else if (key === ".") inputDecimal();
    else if (key === "AC") clear();
    else if (key === "⌫") backspace();
    else if (ops.includes(key as Operator)) handleOperator(key as Operator);
  };

  /* ---------------- Keyboard Support ---------------- */

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") handleInput(e.key);
      else if (e.key === ".") handleInput(".");
      else if (e.key === "Enter" || e.key === "=") handleInput("=");
      else if (e.key === "Backspace") handleInput("⌫");
      else if (e.key === "Escape") handleInput("AC");
      else if (["+","-","*","/"].includes(e.key)) handleInput(e.key);
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [display, prev, op]);

  /* ---------------- UI ---------------- */

  const buttons: Key[] = [
    "AC", "⌫", "/", 
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=",
  ];

  return (
    <div className="w-80 mx-auto bg-gray-900 rounded-xl p-4">
      <div className="h-24 text-right text-4xl text-white font-mono mb-4">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((b) => (
          <button
            key={b}
            onClick={() => handleInput(b)}
            className={`h-16 rounded-lg text-xl font-bold
              ${ops.includes(b as Operator) ? "bg-orange-500" : "bg-gray-700"}
              ${b === "AC" ? "col-span-2 bg-gray-600" : ""}
            `}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
