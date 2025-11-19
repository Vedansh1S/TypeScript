// ==========================================
// 1. BASIC TYPES & FUNCTIONS
// ==========================================

// Use PascalCase for Type names
type UserProfile = {
    name: string;
    age: number;
    address: {
      area: string;
      pincode: number;
      country: string;
    };
  };
  
  // Function with explicit type annotation for arguments
  function greetUser(user: UserProfile): void {
    console.log(
      `Hello ${user.name}, your age is ${user.age} and you live in ${user.address.area}`
    );
  }
  
  let myUser: UserProfile = {
    name: "Vedansh",
    age: 21,
    address: {
      area: "Surat",
      pincode: 394140,
      country: "India",
    },
  };
  
  greetUser(myUser);
  
  // ==========================================
  // 2. ARROW FUNCTIONS & INLINE TYPES
  // ==========================================
  
  // You can define the structure inline, though extracting it to a 'type' is usually cleaner
  const greetArrow = (user: {
    name: string;
    age: number;
    address: {
      area: string;
      pincode: number;
      country: string;
    };
  }): void => {
    console.log(
      `Hello ${user.name}, your age is ${user.age} and you live in ${user.address.area}`
    );
  };
  
  let myUser2 = {
    name: "Sharma",
    age: 22,
    address: {
      area: "Mumbai",
      pincode: 400012,
      country: "India",
    },
  };
  
  greetArrow(myUser2);
  
  // Explicit Return Types
  function sumValues(a: number, b: number): number {
    console.log(a + b);
    return a + b;
  }
  
  sumValues(5, 10);
  
  // ==========================================
  // 3. STRUCTURAL TYPING vs. EXCESS PROPERTY CHECKS
  // ==========================================
  
  type SimpleUser = {
    name: string;
  };
  
  const heavyUserObject = {
    name: "Vedansh",
    age: 22, // Extra property
  };
  
  // ✅ ALLOWED: Indirect Assignment (Duck Typing)
  // TypeScript sees that 'heavyUserObject' has 'name', so it fits 'SimpleUser'.
  // It ignores the extra 'age' property because we are assigning an existing variable.
  const testUser: SimpleUser = heavyUserObject;
  
  // ❌ ERROR: Property 'age' does not exist on type 'SimpleUser'.
  // Even though the value technically has 'age', the TYPE 'SimpleUser' hides it.
  // console.log(testUser.age); 
  
  type CarModel = { model: string };
  const bmwCar = { model: "BMW", price: 50000 };
  
  // ✅ ALLOWED: Indirect assignment avoids "Excess Property Checks"
  const indirectCar: CarModel = bmwCar;
  
  // ❌ ERROR: Direct Object Literal Assignment
  // When you create an object literal directly into a variable with a type,
  // TypeScript invokes "Excess Property Checking" (strict mode) to prevent typos.
  // const literalCar: CarModel = { model: "BMW", price: 50000 }; 
  
  // ==========================================
  // 4. OPTIONAL PROPERTIES & NARROWING
  // ==========================================
  
  type OptionalUser = {
    name: string;
    age?: number; // The '?' makes this optional (number | undefined)
  };
  
  const optUser: OptionalUser = { name: "Vedansh" };
  
  // ❌ ERROR: Object is possibly 'undefined'.
  // console.log(optUser.age + 10); 
  
  // ✅ FIX: Type Narrowing (Check for undefined)
  if (optUser.age !== undefined) {
    console.log(optUser.age + 10);
  }
  
  // ==========================================
  // 5. UTILITY TYPES (Pick, Omit, Partial, Readonly)
  // ==========================================
  
  type FullUser = {
    name: string;
    age: number;
    email: string;
  };
  
  // 1. Pick: Select only specific keys
  type OnlyName = Pick<FullUser, "name">;
  const pickUser: OnlyName = { name: "Vedansh" };
  
  // 2. Omit: Remove specific keys
  type WithoutAge = Omit<FullUser, "age">;
  const omitUser: WithoutAge = { name: "Vedansh", email: "test@test.com" };
  
  // 3. Partial: Make ALL keys optional
  type PartialUserType = Partial<FullUser>;
  const partialUser: PartialUserType = {}; // Valid because everything is optional
  
  // 4. Readonly: Make ALL keys un-editable
  const readonlyUser: Readonly<FullUser> = { 
    name: "Vedansh", 
    age: 21, 
    email: "v@v.com" 
  };
  // readonlyUser.age = 30; // ❌ Error: Cannot assign to 'age' because it is read-only.
  
  // ==========================================
  // 6. INTERFACES
  // ==========================================
  
  // Interface defining a method
  interface PersonInterface {
    name: string;
    greet(): void;
  }
  
  const personObj: PersonInterface = {
    name: "Vedansh",
    greet() {
      console.log(`Hello ${this.name}`);
    },
  };
  
  // Interface Inheritance (extends)
  interface BaseEntity {
    id: number;
  }
  
  interface EmployeeInterface extends BaseEntity {
    name: string;
    department: string;
  }
  
  const emp: EmployeeInterface = {
    id: 101,
    name: "Vedansh",
    department: "IT",
  };
  
  // ==========================================
  // 7. INTERFACES FOR FUNCTIONS & INDEX SIGNATURES
  // ==========================================
  
  // Interface for a function shape
  interface MathFunc {
    (a: number, b: number): number;
  }
  
  const addNumbers: MathFunc = (a, b) => a + b;
  
  // Index Signature (Dictionary Pattern)
  // Used when you don't know the property names in advance, but you know the type.
  interface StringDictionary {
    [key: string]: string;
  }
  
  const colors: StringDictionary = {
    header: "blue",
    footer: "black",
    // sidebar: 10 // ❌ Error: Type 'number' is not assignable to type 'string'.
  };
  
  // Array Interface (Uncommon, but possible)
  interface NumArrayInterface {
    [index: number]: number;
  }
  const numbersList: NumArrayInterface = [1, 2, 3];
  
  // ==========================================
  // 8. DECLARATION MERGING
  // ==========================================
  
  // Unique feature of Interfaces: They merge if defined twice.
  interface MergedUser {
    name: string;
  }
  
  interface MergedUser {
    age: number;
  }
  
  // The resulting type requires BOTH name and age
  const finalUser: MergedUser = {
    name: "Vedansh",
    age: 21,
  };
  
  // Note: 'type' aliases do NOT support merging. This would be an error with types.
  
  // ==========================================
  // 9. COMPLEX INDEX SIGNATURES
  // ==========================================
  
  // Index signature allowing mixed types with a "catch-all"
  interface FlexibleUser {
    name: string;
    age: number;
    // This says: Any other string key must have a value of string OR number
    [key: string]: string | number; 
  }
  
  const flexUser: FlexibleUser = {
    name: "Vedansh",
    age: 21,
    email: "vedansh@example.com", // string - OK
    phone: 12345,                // number - OK
    // isActive: true            // ❌ Error: boolean is not string | number
  };
  
  // Array of Objects
  interface UserArrayItem {
    name: string;
    age: number;
  }
  
  // Defines an array where every item matches UserArrayItem
  interface UserList {
    [index: number]: UserArrayItem;
  }
  
  const peopleList: UserList = [
    { name: "Vedansh", age: 21 },
    { name: "Rohan", age: 22 },
  ];