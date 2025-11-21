// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// ==========================================
// 1. BASIC TYPE ALIASES
// ==========================================
// 'type' is similar to 'interface' but can represent primitive types,
// unions, and tuples, not just objects.

type UserType = {
  name: string;
  age: number;
};

const basicUser: UserType = {
  name: "Ved",
  age: 22,
};

console.log("--- Basic Type ---");
console.log(`Hello ${basicUser.name}, I am ${basicUser.age} years old`);

// ==========================================
// 2. UNION TYPES (|)
// ==========================================
// A variable can be one of several types.
// "It is EITHER a string OR a number".

type ID = string | number; // Custom Union Type
type Status = "success" | "error"; // Literal Union Type

const id1: ID = "vedansh"; // Valid
const id2: ID = 21; // Valid
// const id3: ID = true;   // ❌ Error

console.log("\n--- Union Types ---");
console.log(`Different IDs are ${id1} (string) and ${id2} (number)`);

// ==========================================
// 3. INTERSECTION TYPES (&)
// ==========================================
// Combines multiple types into one. The object MUST have ALL properties.

type PersonInfo = { name: string };
type WorkerInfo = { department: number };

// 'EmployeeType' must have BOTH name AND department
type EmployeeType = PersonInfo & WorkerInfo;

const newEmployee: EmployeeType = {
  name: "Sharma",
  department: 223,
};

console.log("\n--- Intersection Types ---");
console.log(
  `Hello ${newEmployee.name}, your Department is ${newEmployee.department}`
);

// You can also extend types inline using intersection:
type BaseConfig = { a: string };
type ExtendedConfig = BaseConfig & { b: number }; // { a: string; b: number }

// ==========================================
// 4. FUNCTION TYPES
// ==========================================
// Defining the signature of a function using 'type'

type MathFunc = (a: number, b: number) => number;

const addFunc: MathFunc = (a, b) => a + b;
const mathResult = addFunc(5, 10);

console.log("\n--- Function Types ---");
console.log(`Result: ${mathResult}`);

// ==========================================
// 5. TUPLES
// ==========================================
// Fixed-length array where each element has a specific type.

type RGB = [number, number, number]; // Exactly 3 numbers
const blueColor: RGB = [100, 50, 10];

console.log("\n--- Tuples ---");
console.log(`Green channel value: ${blueColor[1]}`);

// ==========================================
// 6. UTILITY TYPES (Partial, Pick, Omit, Readonly)
// ==========================================
// TypeScript provides built-in tools to transform types.

type UserData = {
  name: string;
  age: number;
  address: {
    street: string;
    country: string;
  };
};

// 1. Partial: Makes ALL properties optional (name?, age?, address?)
type PartialData = Partial<UserData>;

// 2. Pick: Creates a new type with ONLY the selected properties
type OnlyName = Pick<UserData, "name">;
// If you wanted two properties: Pick<UserData, "name" | "age">

// 3. Omit: Creates a new type WITHOUT the selected properties
type WithoutAddress = Omit<UserData, "address">;

// 4. Readonly: Makes properties immutable (cannot be changed)
type ImmutableData = Readonly<UserData>;

const realInfo: UserData = {
  name: "Ved",
  age: 21,
  address: { street: "Surat", country: "India" },
};

// Examples:
const partialUser: PartialData = { age: 21 }; // 'name' and 'address' are missing but allowed
const nameOnlyUser: OnlyName = { name: "Sharma" };
const noAddrUser: WithoutAddress = { name: "Vedansh", age: 21 };
const readonlyUser: ImmutableData = {
  name: "Ved",
  age: 22,
  address: { street: "Surat", country: "India" },
};

// readonlyUser.name = "Changed"; // ❌ Error: name is read-only

console.log("\n--- Utility Types ---");
console.log(`Partial User Age: ${partialUser.age}`);
console.log(`Pick User Name: ${nameOnlyUser.name}`);
console.log(`Omit User (No Address): ${JSON.stringify(noAddrUser)}`);

// ==========================================
// 7. INDEX SIGNATURES (WITH TYPE)
// ==========================================
// Same as interfaces, types can define dictionary-like objects.

type SubjectMarks = {
  [subject: string]: number;
};

const myMarks: SubjectMarks = {
  math: 95,
  physics: 88,
};

// ==========================================
// 8. MIXING TYPES AND INTERFACES
// ==========================================
// You can use an Interface inside a Type and vice-versa.

interface IPerson {
  name: string;
}

type TEmployee = {
  empId: number;
};

// Intersection of an Interface and a Type
type HybridWorker = IPerson & TEmployee;

const workerObj: HybridWorker = {
  name: "Vedansh",
  empId: 101,
};

console.log("\n--- Mixing Types & Interfaces ---");
console.log(`${workerObj.name} has ID: ${workerObj.empId}`);

// ==========================================
// 9. DIFFERENCE: DECLARATION MERGING
// ==========================================

// Interfaces can be merged (See interfaces_guide.ts), Types CANNOT.

type User3 = { name: string };
// type User3 = { age: number }; // ❌ Error: Duplicate identifier 'User3'.
