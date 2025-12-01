// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// ==========================================
// DECORATORS - Advanced TypeScript Feature
// ==========================================
// Decorators are a special kind of declaration that can be attached to classes,
// methods, properties, or parameters. They use the form @expression.

// IMPORTANT: Enable decorators in tsconfig.json:
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

// ==========================================
// 1. CLASS DECORATORS
// ==========================================
// A class decorator is applied to the constructor of the class.

// Simple decorator that logs when a class is defined
function LogClass(target: Function) {
  console.log(`Class ${target.name} has been defined!`);
}

@LogClass
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// Decorator Factory: Returns a decorator function
// This allows you to pass parameters to your decorator
function AddMetadata(metadata: string) {
  return function (target: Function) {
    // Add custom property to the class
    (target as any).metadata = metadata;
    console.log(`Added metadata "${metadata}" to ${target.name}`);
  };
}

@AddMetadata("user-management")
class Admin {
  constructor(public role: string) {}
}

// Access the metadata
console.log((Admin as any).metadata); // "user-management"

// ==========================================
// 2. METHOD DECORATORS
// ==========================================
// Applied to methods. Can observe, modify, or replace method definitions.

// Decorator that logs method calls
function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling method: ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

// Decorator that measures execution time
function MeasureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(
      `Method ${propertyKey} took ${(end - start).toFixed(2)} milliseconds`
    );
    return result;
  };

  return descriptor;
}

class Calculator {
  @LogMethod
  @MeasureTime
  add(a: number, b: number): number {
    // Simulate some work
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return a + b;
  }

  @LogMethod
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5, 10);
calc.multiply(3, 4);

// ==========================================
// 3. PROPERTY DECORATORS
// ==========================================
// Applied to class properties. Useful for validation, logging, or metadata.

// Decorator that makes a property readonly
function ReadonlyProperty(target: any, propertyKey: string) {
  let value: any;

  const getter = function () {
    return value;
  };

  const setter = function (newVal: any) {
    if (value === undefined) {
      value = newVal;
    } else {
      console.warn(
        `Cannot modify readonly property ${propertyKey}. Value remains: ${value}`
      );
    }
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

// Decorator that formats a property value
function Format(formatFn: (value: any) => any) {
  return function (target: any, propertyKey: string) {
    let value: any;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: any) {
      value = formatFn(newVal);
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

class Product {
  @ReadonlyProperty
  id: number;

  @Format((val: string) => val.toUpperCase())
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const product = new Product(1, "laptop");
console.log(product.name); // "LAPTOP" (automatically uppercased)
product.id = 2; // Warning: Cannot modify readonly property
console.log(product.id); // Still 1

// ==========================================
// 4. PARAMETER DECORATORS
// ==========================================
// Applied to function parameters. Often used for dependency injection.

// Parameter decorator example (simplified - full version requires reflect-metadata)
function Required(target: any, propertyKey: string, parameterIndex: number) {
  console.log(
    `Parameter at index ${parameterIndex} of ${propertyKey} is required`
  );
}

// Note: Full parameter validation with Reflect.getMetadata requires:
// npm install reflect-metadata
// import 'reflect-metadata';
// Then you can use Reflect.getMetadata and Reflect.defineMetadata

class UserService {
  createUser(
    @Required name: string,
    @Required age: number,
    email?: string
  ): void {
    console.log(
      `Creating user: ${name}, age: ${age}, email: ${email || "N/A"}`
    );
  }
}

const userService = new UserService();
userService.createUser("Vedansh", 22, "ved@example.com");

// ==========================================
// 5. ACCESSOR DECORATORS (GETTERS/SETTERS)
// ==========================================

function LogAccess(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;

  if (originalGet) {
    descriptor.get = function () {
      console.log(`Getting value of ${propertyKey}`);
      return originalGet.call(this);
    };
  }

  if (originalSet) {
    descriptor.set = function (value: any) {
      console.log(`Setting value of ${propertyKey} to:`, value);
      originalSet.call(this, value);
    };
  }

  return descriptor;
}

class BankAccount {
  private _balance: number = 0;

  // Note: When using decorators on accessors, apply to the getter OR setter, not both
  // TypeScript doesn't allow decorators on both getter and setter of the same property
  @LogAccess
  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount >= 0) {
      this._balance = amount;
      console.log(`Setting balance to: ${amount}`);
    } else {
      console.error("Balance cannot be negative!");
    }
  }
}

const account = new BankAccount();
account.balance = 1000; // Logs: Setting value of balance to: 1000
console.log(account.balance); // Logs: Getting value of balance, then: 1000

// ==========================================
// 6. REAL-WORLD EXAMPLE: API Route Decorator
// ==========================================

// Simulating a web framework decorator pattern
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function Route(method: HttpMethod, path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    // Store route metadata
    if (!target.routes) {
      target.routes = [];
    }
    target.routes.push({ method, path, handler: propertyKey });

    console.log(`Registered route: ${method} ${path} -> ${propertyKey}`);

    return descriptor;
  };
}

class UserController {
  static routes: Array<{ method: HttpMethod; path: string; handler: string }> =
    [];

  @Route("GET", "/users")
  getAllUsers() {
    return { users: ["Vedansh", "Sharma"] };
  }

  @Route("POST", "/users")
  createUser(data: any) {
    return { message: "User created", data };
  }

  @Route("GET", "/users/:id")
  getUserById(id: string) {
    return { user: { id, name: "Vedansh" } };
  }
}

console.log("\n--- Registered Routes ---");
console.log(UserController.routes);

// ==========================================
// 7. COMBINING MULTIPLE DECORATORS
// ==========================================

// Decorators are applied bottom-to-top (reverse order)
function First() {
  console.log("First decorator factory");
  return function (target: any) {
    console.log("First decorator applied");
  };
}

function Second() {
  console.log("Second decorator factory");
  return function (target: any) {
    console.log("Second decorator applied");
  };
}

@First()
@Second()
class MultiDecorated {
  // Execution order:
  // 1. Second decorator factory
  // 2. First decorator factory
  // 3. Second decorator applied
  // 4. First decorator applied
}

// ==========================================
// 8. DECORATOR METADATA (Requires reflect-metadata)
// ==========================================
// Note: This requires installing 'reflect-metadata' package
// npm install reflect-metadata

// import 'reflect-metadata';

// function Injectable(target: any) {
//   Reflect.defineMetadata('injectable', true, target);
// }

// @Injectable
// class Service {
//   // This class is now marked as injectable
// }

// const isInjectable = Reflect.getMetadata('injectable', Service);
// console.log(isInjectable); // true

// ==========================================
// SUMMARY
// ==========================================
// Decorators are powerful for:
// - Logging and debugging
// - Performance monitoring
// - Validation
// - Dependency injection
// - Framework features (like Angular, NestJS)
// - Metadata attachment
//
// They allow you to add behavior to classes, methods, and properties
// in a declarative, reusable way!
