import React, { useState } from "react";

// Type definitions
type Operator = "+" | "-" | "*" | "/" | "=";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type DisplayValue = string;

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Calculator: React.FC = () => {
  // State for the calculator with explicit types
  const [display, setDisplay] = useState<DisplayValue>("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false);

  // Handle number inputs (0-9 and .)
  const inputDigit = (digit: Digit): void => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = (): void => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Handle Operations (+, -, *, /)
  const performOperation = (nextOperator: Operator): void => {
    const inputValue: number = parseFloat(display);

    if (isNaN(inputValue)) {
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      try {
        const result: number = calculate(firstOperand, inputValue, operator);
        setDisplay(formatResult(result));
        setFirstOperand(result);
      } catch (error) {
        setDisplay("Error");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // Core Calculation Logic with explicit return type
  const calculate = (first: number, second: number, op: Operator): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        if (second === 0) {
          throw new Error("Division by zero");
        }
        return first / second;
      case "=":
        return second; // If = is pressed, just return current input
      default:
        // Exhaustive check - TypeScript will error if we miss an operator
        // This ensures all Operator cases are handled
        const _exhaustiveCheck: never = op;
        throw new Error(`Unhandled operator: ${_exhaustiveCheck}`);
    }
  };

  // Format result to avoid scientific notation and limit decimal places
  const formatResult = (value: number): DisplayValue => {
    if (!isFinite(value)) {
      return "Error";
    }
    // Limit to 10 decimal places and remove trailing zeros
    return value.toString().includes("e")
      ? value.toExponential(10)
      : parseFloat(value.toFixed(10)).toString();
  };

  // Reset Function (AC)
  const resetCalculator = (): void => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // Helper to Render Buttons with proper TypeScript interface
  const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    className = "",
  }) => (
    <button
      onClick={onClick}
      className={`h-20 text-2xl font-bold text-white transition-all hover:opacity-90 active:scale-95 rounded-lg ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Display Screen */}
      <div className="h-32 bg-black/40 p-6 flex items-end justify-end">
        <div className="text-5xl text-white font-mono tracking-wider truncate w-full text-right">
          {display}
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-1 bg-gray-800 p-1">
        <Button
          label="AC"
          onClick={resetCalculator}
          className="col-span-3 bg-gray-600 text-red-100"
        />
        <Button
          label="÷"
          onClick={() => performOperation("/")}
          className="bg-orange-500"
        />

        <Button
          label="7"
          onClick={() => inputDigit("7")}
          className="bg-gray-700"
        />
        <Button
          label="8"
          onClick={() => inputDigit("8")}
          className="bg-gray-700"
        />
        <Button
          label="9"
          onClick={() => inputDigit("9")}
          className="bg-gray-700"
        />
        <Button
          label="×"
          onClick={() => performOperation("*")}
          className="bg-orange-500"
        />

        <Button
          label="4"
          onClick={() => inputDigit("4")}
          className="bg-gray-700"
        />
        <Button
          label="5"
          onClick={() => inputDigit("5")}
          className="bg-gray-700"
        />
        <Button
          label="6"
          onClick={() => inputDigit("6")}
          className="bg-gray-700"
        />
        <Button
          label="-"
          onClick={() => performOperation("-")}
          className="bg-orange-500"
        />

        <Button
          label="1"
          onClick={() => inputDigit("1")}
          className="bg-gray-700"
        />
        <Button
          label="2"
          onClick={() => inputDigit("2")}
          className="bg-gray-700"
        />
        <Button
          label="3"
          onClick={() => inputDigit("3")}
          className="bg-gray-700"
        />
        <Button
          label="+"
          onClick={() => performOperation("+")}
          className="bg-orange-500"
        />

        <Button
          label="0"
          onClick={() => inputDigit("0")}
          className="col-span-2 bg-gray-700 rounded-bl-xl"
        />
        <Button label="." onClick={inputDecimal} className="bg-gray-700" />
        <Button
          label="="
          onClick={() => performOperation("=")}
          className="bg-orange-500 rounded-br-xl"
        />
      </div>
    </div>
  );
};

export default Calculator;
