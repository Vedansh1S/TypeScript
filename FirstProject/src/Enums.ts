// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// TypeScript defaults the first value to 0, then adds 1 to each subsequent value.
enum GameControl {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

const currentMove: GameControl = GameControl.Up;
console.log(currentMove); // Output: 0

// You can also set a custom start:
enum HttpCode {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
}
// Note: ServerError automatically becomes 501 if we didn't specify it?
// No, here we specified all, but if we wrote ServerError without value, it would be 405.

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

function checkAccess(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

checkAccess(UserRole.ADMIN); // Allowed
// checkAccess("ADMIN");     // Error: Argument of type '"ADMIN"' is not assignable to parameter of type 'UserRole'.

/**
 * CONCEPT: Nominal Typing
 * Even though the string value is the same ("ADMIN"), TypeScript treats
 * the Enum as a unique type. This prevents accidental typos like checkAccess("ADMIN").
 */

enum Color {
  Red,
  Green,
}

// 1. Forward lookup (Key -> Value)
console.log(Color.Red); // 0

// 2. Reverse lookup (Value -> Key)
// ONLY works for Numeric Enums, not String Enums.
console.log(Color[0]); // "Red"

/**
 * UNDER THE HOOD: What the JS file actually looks like
 * TypeScript generates an IIFE (Immediately Invoked Function Expression)
 * to create an object that maps both ways.
 */

/* var Color;
     (function (Color) {
         // Steps explanation:
         // 1. Color["Red"] = 0;  -> Assigns value 0 to key "Red"
         // 2. Color[0] = "Red";  -> Assigns value "Red" to key "0" (Reverse Mapping)
         Color[Color["Red"] = 0] = "Red"; 
         Color[Color["Green"] = 1] = "Green";
     })(Color || (Color = {}));
  */

// Effectively, the object in memory looks like this:
const ColorObjectInMemory = {
  Red: 0,
  Green: 1,
  "0": "Red",
  "1": "Green",
};

// Standard Enum: Exists as a real object at runtime.
enum RegularEnum {
  A,
  B,
}

// Const Enum: REMOVED during compilation.
const enum OptimizedEnum {
  Up,
  Down,
}

const move = OptimizedEnum.Up;

// ------------------------------------------------------
// 📂 JS OUTPUT (What actually runs in the browser):
// ------------------------------------------------------
// var move = 0;
// ------------------------------------------------------

/**
 * ERROR EXPLAINED:
 * console.log(OptimizedEnum);
 * * This fails because 'OptimizedEnum' is erased from the final JS file.
 * It only exists in TS land to help you code.
 * TS finds every usage and replaces it directly with the number (Inlining).
 */

// Option A: Enum (Good for distinct groups of constants)
enum ThemeEnum {
  Dark = "dark",
  Light = "light",
}

// Option B: Union Type (Best for simple string passing, lighter weight)
// ⚡ Preferred in modern TypeScript for simple strings.
type ThemeUnion = "dark" | "light";

// Option C: Object as Enum (The "JavaScript Way")
// const assertions (as const) make properties readonly and literal types.
const ThemeObj = {
  Dark: "dark",
  Light: "light",
} as const;

type ThemeObjType = (typeof ThemeObj)[keyof typeof ThemeObj]; // "dark" | "light"

// USAGE COMPARISON:
function setTheme(t: ThemeUnion) {} // slightly easier, accepts string literal "dark"
function setEnum(t: ThemeEnum) {} // stricter, requires ThemeEnum.Dark
