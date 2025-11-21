// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// 1. Standard Identity Function
function echo<T>(value: T): T {
  return value;
}

// TypeScript infers 'T' automatically based on usage
const greeting = echo("Hello"); // T is string
const score = echo(100); // T is number
const isActive = echo(true); // T is boolean

// You can explicitly set T (useful for union types)
const mixedValue = echo<string | number>("Vedansh");

console.log(greeting.toUpperCase()); // ✔ Safe

// ------------------ ******** ---------------------------

// 2. Array Wrappers
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numList = wrapInArray(5); // number[]
const strList = wrapInArray("hello"); // string[]

// ------------------ ******** ---------------------------

// 3. Handling Mixed Arrays (Your Question Answered)
function getList<T>(items: T[]): T[] {
  return items;
}

// Scenario A: Homogeneous Arrays
const pureNumbers = getList([1, 2, 3]); // T = number

// Scenario B: Mixed Arrays (The Solution)
// TypeScript is smart enough to infer (string | number)[],
// but we can also be explicit.
const mixedInferred = getList([1, "a", "b"]); // T is inferred as (string | number)

// If you want to FORCE strict typing for mixed content:
const mixedExplicit = getList<string | number>([1, "a", "b"]);

console.log(mixedExplicit);

// ------------------ ******** ---------------------------

/* 
    4. Combining Values
    Your Question: Should this return (T|U)[] or [T, U]?
    Answer:
    - Use (T|U)[] if it's a list where order doesn't matter.
    - Use [T, U] (Tuple) if index 0 is ALWAYS T and index 1 is ALWAYS U.
 */

function createTuple<T, U>(first: T, second: U): [T, U] {
  return [first, second]; // This is a Tuple
}

const userTuple = createTuple("Vedansh", 22);
// type: [string, number] -> stricter and usually better for pairs

function createArray<T, U>(first: T, second: U): (T | U)[] {
  return [first, second]; // This is a Mixed Array
}

const userArray = createArray("Vedansh", 22);
// type: (string | number)[] -> looser

// ------------------ ******** ---------------------------

// 5. Why we need Constraints
function getRawObject<T>(obj: T) {
  // return obj.name;
  // ERROR Explanation: T could be literally anything (number, boolean, null).
  // Since 'number' doesn't have a .name property, TS blocks this.
  return obj;
}

// ------------------ ******** ---------------------------

// 6. enforcing Constraints (extends)
// We promise TS: "T will definitely have a name property of type string"
function getNameSafely<T extends { name: string }>(obj: T): string {
  return obj.name;
}

getNameSafely({ name: "Vedansh", age: 22 }); // ✔ Works (extra props like age are fine)
// getNameSafely({ age: 22 });               // ❌ Error: Missing 'name'

// ------------------ ******** ---------------------------

// 7. The "Length" Constraint (Duck Typing)
// Explanation: This accepts ANYTHING that has a .length property that is a number.
// It works for Strings, Arrays, and even custom objects with a length key.
function logLength<T extends { length: number }>(item: T): number {
  console.log(`Length is: ${item.length}`);
  return item.length;
}

logLength([1, 2, 3]); // ✔ Array has .length
logLength("Vedansh"); // ✔ String has .length
logLength({ length: 10 }); // ✔ Object with .length
// logLength(100);          // Number does not have .length

// ------------------ ******** ---------------------------

// 8. The 'keyof' Operator
// Question: What is the return type?
// Answer: T[K]. This is called an "Indexed Access Type".
// If T is User and K is "age", T[K] becomes number.

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const userProfile = { name: "Vedansh", age: 22, active: true };

const userName = getProperty(userProfile, "name"); // Type: string
const userAge = getProperty(userProfile, "age"); // Type: number
// getProperty(userProfile, "email");              // Error: "email" is not a key of userProfile

// ------------------ ******** ---------------------------

// 9. Merging Objects
// Question: Can I use <T extends object>?
// Answer: Yes! And the return type should be T & U (Intersection).

function mergeObjects<T extends object, U extends object>(
  objA: T,
  objB: U
): T & U {
  return { ...objA, ...objB };
}

const merged = mergeObjects({ name: "Vedansh" }, { age: 22 });
// merged.name (string) AND merged.age (number) are now available.

// mergeObjects(10, { a: 1 }); // Error: 10 is not an object

// ------------------ ******** ---------------------------

// 10. Generic Arrow Function Syntax
const identityArrow = <T>(val: T): T => val;

/*
    11. The Math Problem
    Your code: const double2 = <T extends number>(value: T): T => value * 2;
    ERROR Explanation:
    If T is a "Literal Type" (e.g., specifically the number 5), then the function MUST return 5.
    But value * 2 returns 10.
    10 is a 'number', but 10 is NOT of type '5'.
    Therefore, we cannot promise to return T. We must return 'number'.
*/
const doubleValue = <T extends number>(value: T): number => {
  return value * 2;
};

const val = doubleValue(10); // Returns number (20)
