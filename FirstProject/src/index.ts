// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// ---------------------------------------------------------
// BASIC VARIABLES & FUNCTIONS
// ---------------------------------------------------------

// A simple string variable using 'const' since it doesn't change
const userName: string = "vedansh";

// Regular function that greets a person
function greeting(name: string): void {
  console.log(`Hello, ${name}`);
}

// Arrow function returning a sum. Separating the console.log from the return
// for a pure function design.
const add = (a: number, b: number): number => {
  const result = a + b;
  console.log(`Calculating sum: ${result}`); // Log the calculation
  return result; // Return the result
};

// Arrow function greeting (Using 'const' for consistent declaration style)
const greeting1 = (name: string): void => {
  console.log(`Greetings, ${name}`);
};

// ---------------------------------------------------------
// FUNCTION CALLBACK EXAMPLES
// ---------------------------------------------------------

// Executes the given function immediately
const executeImmediately = (callback: () => void): void => {
  callback();
};

// Calls the given function repeatedly every 3 seconds
const executeRepeatedly = (
  callback: (message: string) => void,
  message: string
): void => {
  setInterval(() => {
    callback(message);
  }, 3000);
};

// Example: call greeting repeatedly
executeRepeatedly(greeting, "Vedansh returns (repeatedly)");

// Delay a mathematical function and print result after 1 second
function delayedMath(
  mathFn: (a: number, b: number) => number,
  a: number,
  b: number
): void {
  setTimeout(() => {
    // Math function is executed inside the timeout
    const result = mathFn(a, b);
    console.log(`Delayed Math Result: ${result}`);
  }, 1000);
}

// Takes a function that returns a number, logs the returned value
// Renamed to 'logFunctionResult' for clarity.
const logFunctionResult = (callback: () => number): void => {
  const result = callback();
  console.log(`Function Result: ${result}`);
};

// Example: pass add(5, 50)
logFunctionResult(() => add(5, 50));

// ---------------------------------------------------------
// SIMPLE DELAY UTILITY
// ---------------------------------------------------------

// Delays any function by 1 second
function delay(callback: () => void): void {
  setTimeout(callback, 1000);
}

// Example function to pass into delay()
function logMessage(): void {
  console.log(`Hello there from the delayed log!`);
}

// ---------------------------------------------------------
// DIRECT EXECUTION
// ---------------------------------------------------------

// Using executeImmediately() to call greeting1() immediately
executeImmediately(() => greeting1("vedansh sharma (immediate)"));

// Regular greeting calls
greeting("Vedansh 1");
greeting1("Vedansh 2");

// Print sum + variable
console.log(`--- Direct Execution Results ---`);
console.log(`Add(1, 3) returned: ${add(1, 3)}`);
console.log(`User Name: ${userName}`);

// Call delayed math function
delayedMath(add, 10, 15); // The result will appear after 1 second

// Delay a simple log
delay(logMessage); // The result will appear after 1 second