// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// ==========================================
// 1. BASIC INTERFACE
// ==========================================
interface BaseUser {
  name: string;
  age: number;
}

const simpleUser: BaseUser = {
  name: "Vedansh",
  age: 22,
};

console.log("--- Basic Interface ---");
console.log(simpleUser.name);

// ==========================================
// 2. MODIFIERS: OPTIONAL (?) & READONLY
// ==========================================
interface AdvancedUser {
  readonly name: string; // Cannot be changed after creation
  age?: number; // Optional: Can be number OR undefined
  greet(): void; // Method definition
}

// Case A: Without the optional 'age'
const userOne: AdvancedUser = {
  name: "Vedansh Sharma",
  greet() {
    console.log("Hello from User One");
  },
};

// Case B: With the optional 'age' included
const userTwo: AdvancedUser = {
  name: "Vedansh",
  age: 22,
  greet() {
    console.log("Hello there from User Two");
  },
};

// Testing Readonly
// userOne.name = "New Name"; // ❌ Error: Cannot assign to 'name' because it is a read-only property.

console.log("\n--- Modifiers ---");
console.log(userOne.name);
userOne.greet();

if (userTwo.age) {
  console.log(`User Two Age: ${userTwo.age}`);
}

// ==========================================
// 3. INTERFACE INHERITANCE (EXTENDS)
// ==========================================
interface Person {
  name: string;
}

// 'Employee' copies everything from 'Person' and adds 'age'
interface Employee extends Person {
  age: number;
}

const newEmployee: Employee = {
  name: "Vedansh", // Inherited from Person
  age: 22, // Defined in Employee
};

console.log("\n--- Inheritance ---");
console.log(`${newEmployee.name} is ${newEmployee.age} years old.`);

// ==========================================
// 4. FUNCTION INTERFACES
// ==========================================
// Defines the "shape" of a function: (inputs) => output
interface MathOperation {
  (a: number, b: number, c: number): number;
}

const addNumbers: MathOperation = (x, y, z) => {
  return x + y + z;
};

// Alternative inline syntax (just for reference):
// const add = (a: number, b: number, c: number): number => a + b + c;

const result = addNumbers(5, 6, 7);
console.log("\n--- Function Interface ---");
console.log(`Result: ${result}`);

// ==========================================
// 5. INDEX SIGNATURES
// ==========================================
// Used when you don't know the property names, but you know the types.
interface SubjectScores {
  [subject: string]: number; // Keys are strings, Values are numbers
}

const reportCard: SubjectScores = {
  hindi: 92,
  english: 20,
  maths: 100, // You can add as many as you want
};

const hindiMarks = reportCard.hindi;

console.log("\n--- Index Signatures ---");
console.log(`Hindi Marks: ${hindiMarks}`);

// ==========================================
// 6. DECLARATION MERGING
// ==========================================
// If you define two interfaces with the same name, TS automatically merges them.
// This is unique to Interfaces (Types cannot do this).

interface MergedConfig {
  appName: string;
}

interface MergedConfig {
  version: number;
}

// The resulting 'MergedConfig' requires BOTH properties
const appSettings: MergedConfig = {
  appName: "My Super App",
  version: 1.0,
};

console.log("\n--- Declaration Merging ---");
console.log(`App: ${appSettings.appName} v${appSettings.version}`);

// ==========================================
// 7. INTERSECTION TYPES (&)
// ==========================================
// This combines two EXISTING types/interfaces into a new one manually.

interface NameObj {
  name: string;
}

interface AgeObj {
  age: number;
}

// This creates a new TYPE that requires both interfaces
type FullProfile = NameObj & AgeObj;

const intersectionUser: FullProfile = {
  name: "Vedansh",
  age: 21,
};

console.log("\n--- Intersection Types ---");
console.log(intersectionUser);
