// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// ---------------------------------------------------------
// 1. THE "JSX/TSX" SYNTAX PROBLEM (The most common error!)
// ---------------------------------------------------------

// In a .tsx file, <T> looks like a React component/HTML tag.
// const echo = <T>(val: T) => val; // Error in React environments

// ✔ SOLUTION A: The "Trailing Comma" Hack
// The comma tells TypeScript: "This is a Generic list, not a UI tag."
const echo = <T,>(val: T): T => val;

// ✔ SOLUTION B: Using 'extends' (also fixes the parsing issue)
// Even if T extends 'unknown' or 'any', it clarifies syntax.
const logData = <T extends unknown>(val: T): void => console.log(val);


// ---------------------------------------------------------
// 2. CONSTRAINTS & IMPLICIT RETURNS
// ---------------------------------------------------------

// Arrow functions are great for one-liners (implicit return).
// Note: We wrap the returned object in ( ) so it's not confused with a function block.

const mergeDetails = <T extends object, U extends object>(objA: T, objB: U) => ({
  ...objA, 
  ...objB,
  timestamp: new Date() 
});

const user = mergeDetails({ name: "Vedansh" }, { role: "Admin" });
// user is inferred as: T & U & { timestamp: Date }


// ---------------------------------------------------------
// 3. REAL WORLD: DOM ELEMENTS (Type Casting)
// ---------------------------------------------------------

// A common arrow wrapper for querySelector to avoid "as HTMLInputElement" everywhere.
const getElement = <T extends HTMLElement>(selector: string): T | null => {
  return document.querySelector<T>(selector);
};

// Usage:
const input = getElement<HTMLInputElement>(".user-input");
// Now we can safely access specific input properties
console.log(input?.value); 


// ---------------------------------------------------------
// 4. HIGHER ORDER ARROW FUNCTIONS (Currying)
// ---------------------------------------------------------

// A function that returns another function.
// Useful for setting a filter type first, then applying it to data.

const createFilter = <T>(param: T) => (item: T): boolean => {
  return item === param;
};

const filterByActive = createFilter<boolean>(true);
const result = filterByActive(false); // false