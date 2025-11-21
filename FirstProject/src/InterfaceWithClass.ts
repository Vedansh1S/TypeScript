// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// ==========================================
// 1. CLASS IMPLEMENTING AN INTERFACE
// ==========================================

interface BaseUser {
  name: string;
  age: number;
}

// Interface inheritance
interface DepartmentInfo extends BaseUser {
  departmentId: number;
}

// The class MUST implement every property defined in the interface
class Employee implements DepartmentInfo {
  readonly name: string; // 'readonly' prevents modification after initialization
  age: number;
  departmentId: number;

  constructor(name: string, age: number, deptId: number) {
    this.name = name;
    this.age = age;
    this.departmentId = deptId;
  }

  greet() {
    console.log(
      `Hello Mr. ${this.name}, your department ID is ${this.departmentId}`
    );
  }
}

const emp1 = new Employee("Vedansh", 22, 301);
emp1.greet();

// ❌ Error: Cannot assign to 'name' because it is a read-only property.
// emp1.name = "Sharma";

// ==========================================
// 2. IMPLEMENTING MULTIPLE INTERFACES
// ==========================================

interface Startable {
  start(): void;
}

interface Stoppable {
  stop(): void;
}

// A class can implement multiple interfaces (separated by commas)
class Machine implements Startable, Stoppable {
  start() {
    console.log("Machine started");
  }
  stop() {
    console.log("Machine stopped");
  }
}

const myMachine = new Machine();
console.log("\n--- Multiple Interfaces ---");
myMachine.start();
myMachine.stop();

// ==========================================
// 3. ABSTRACT CLASSES VS INTERFACES
// ==========================================

interface Shape {
  area(): number;
}

// Abstract Class: Can contain implementation details AND abstract methods.
// You CANNOT create an instance of an abstract class directly (e.g. new Polygon()).
abstract class Polygon {
  // Constructor Shorthand: 'public name: string' automatically creates
  // the property 'this.name' and assigns the value.
  constructor(public name: string) {}

  // Concrete method (shared by all children)
  describe() {
    console.log(`This is a ${this.name}`);
  }

  // Abstract method (must be implemented by children)
  abstract getDetails(): void;
}

// A class can extend ONE class but implement MANY interfaces
class Rectangle extends Polygon implements Shape {
  constructor(name: string, public height: number, public width: number) {
    super(name); // Must call super() to pass 'name' to the Polygon constructor
  }

  // Implemented from Shape interface
  area(): number {
    return this.height * this.width;
  }

  // Implemented from Polygon abstract class
  getDetails(): void {
    console.log(`Rectangle: ${this.height}x${this.width}`);
  }
}

const rect = new Rectangle("MyRect", 10, 5);
console.log("\n--- Abstract Class ---");
rect.describe(); // Inherited from Polygon
rect.getDetails(); // Implemented in Rectangle
console.log(`Area: ${rect.area()}`);

// ==========================================
// 4. COMPLEX INHERITANCE (Extends + Implements)
// ==========================================

abstract class Vehicle {
  constructor(public brand: string) {}

  start() {
    console.log(`Starting ${this.brand}...`);
  }

  abstract drive(): void;
}

interface Electric {
  charge(): void;
}

// Tesla inherits 'brand' and 'start()' from Vehicle
// It must implement 'drive()' (from Vehicle) and 'charge()' (from Electric)
class Tesla extends Vehicle implements Electric {
  drive() {
    console.log(`${this.brand} is driving silently.`);
  }

  charge() {
    console.log(`Charging ${this.brand}...`);
  }
}

const myCar = new Tesla("Model S");
console.log("\n--- Inheritance + Interface ---");
myCar.start(); // From Vehicle
myCar.drive(); // From Tesla override
myCar.charge(); // From Electric implementation

// ==========================================
// 5. SUPER CALLS & PARAMETER PROPERTIES
// ==========================================

class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  // We accept 'name' and 'breed'.
  // 'name' is passed to Parent. 'breed' is created on Dog.
  constructor(name: string, public breed: string) {
    super(name); // ⚠️ MANDATORY: Must call super before using 'this'
  }
}

const myDog = new Dog("Rex", "German Shepherd");
console.log("\n--- Super & Props ---");
console.log(`Name: ${myDog.name}, Breed: ${myDog.breed}`);

// ==========================================
// 6. ABSTRACT CLASS IMPLEMENTING INTERFACE
// ==========================================

interface AnimalActions {
  move(): void;
  makeSound(): void;
}

// The abstract class promises to fulfill the interface.
// It implements 'makeSound' but leaves 'move' for the child class.
abstract class BaseAnimal implements AnimalActions {
  constructor(public species: string) {}

  makeSound() {
    console.log("Generic Animal Sound");
  }

  abstract move(): void; // Passed down to the child to implement
}

class Bird extends BaseAnimal {
  constructor() {
    super("Bird");
  }

  move() {
    console.log(`${this.species} is flying`);
  }
}

const parrot = new Bird();
console.log("\n--- Abstract Implements Interface ---");
parrot.makeSound(); // From BaseAnimal
parrot.move(); // From Bird

// ==========================================
// 7. ANOTHER EXAMPLE (POLYMORPHISM)
// ==========================================

class Animals {
  speaks() {}
}

class Dogs extends Animals {
  speaks() {
    console.log("Bark");
  }
}

class Cats extends Animals {
  speaks() {
    console.log("Meow");
  }
}

function makeSound(animal: Animals) {
  animal.speaks();
}

makeSound(new Dogs()); // Bark
makeSound(new Cats()); // Meow

// ==========================================
// 8. COMPILE-TIME POLYMORPHISM
// ==========================================

function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  return a + b;
}

console.log(add(5, 10)); // 15
console.log(add("Ved", "ansh")); // Vedansh

// ==========================================
// 8. DEFINING THE CONSTRUCTOR
// ==========================================

interface UserConstructor {
  new (name: string, age: number): User;
}

class User {
  constructor(public name: string, public age: number) {} //Constructor defination
}

function createUser(UserClass: UserConstructor) {
  // checks id the Userclass passes is of userConstructot type
  return new UserClass("Vedansh", 21); // creating an object of this
}

const userObj = createUser(User); //calling the createuser function
console.log(userObj);