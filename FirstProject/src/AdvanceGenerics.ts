// Note:
// Original code by Vedansh | Refactored by AI for clarity and best practices.

// 1. Basic Generic Interface
// 'T' acts as a placeholder for any type we decide later.
interface Container<T> {
    value: T;
  }
  
  // Using the container for different types
  const scoreContainer: Container<number> = { value: 99 };
  const messageContainer: Container<string> = { value: "Hello World" };
  const statusContainer: Container<boolean> = { value: true };
  
  // 2. Generic Collection (Arrays)
  interface ItemList<T> {
    items: T[];
  }
  
  const numbersList: ItemList<number> = { items: [10, 20, 30] };
  const namesList: ItemList<string> = { items: ["Alice", "Bob"] };
  
  console.log("Score:", scoreContainer.value);
  console.log("Names:", namesList.items);


  // 3. Generic Class with Constructor
class ValueHolder<T> {
    // 'public' in constructor automatically creates and assigns the property
    constructor(public value: T) {}
  
    getValue(): T {
      return this.value;
    }
  }
  
  // Usage
  const idHolder = new ValueHolder<number>(101);
  const titleHolder = new ValueHolder<string>("TypeScript Master");
  
  // You can also pass complex objects
  const userHolder = new ValueHolder<{ name: string }>({ name: "Vedansh" });
  
  console.log(idHolder.getValue());      // 101
  console.log(userHolder.getValue().name); // "Vedansh"
  
  // 4. Generic Class with Readonly properties
  class UserProfile<T> {
    constructor(
      public readonly id: T, // Can trigger read, but cannot change
      private name: string
    ) {}
  
    getName() {
      return this.name;
    }
  }
  
  const admin = new UserProfile<number>(500, "AdminUser");
  console.log(`User ID: ${admin.id}, Name: ${admin.getName()}`);
  // admin.id = 501; // Error: Cannot assign to 'id' because it is a read-only property.

  // 5. Generic Default Types (<T = string>)
// If no type is provided, it assumes 'string'.
class DefaultBox<T = string> {
    constructor(public content: T) {}
  }
  
  const textDefault = new DefaultBox("Default is string"); // T inferred as string
  const numOverride = new DefaultBox<number>(123);         // T overrides to number
  
  console.log(textDefault.content); // "Default is string"
  
  // 6. Generic Constraints (extends object) & Key Lookup (keyof)
  // We force T to be an object, and K must be a key inside that object.
  class ObjectManager<T extends object> {
    constructor(public data: T) {}
  
    // K extends keyof T: ensures we only ask for keys that actually exist
    getProperty<K extends keyof T>(key: K): T[K] {
      return this.data[key];
    }
  }
  
  const personManager = new ObjectManager({ name: "Vedansh", age: 22, active: true });
  
  const nameVal = personManager.getProperty("name"); // type: string
  const ageVal = personManager.getProperty("age");   // type: number
  // personManager.getProperty("email"); // Error: Argument of type '"email"' is not assignable...
  
  // Valid inputs because they are objects:
  new ObjectManager([1, 2]); 
  // new ObjectManager(123); // Error: number does not satisfy constraint 'object'

  // Let's define a standard interface to play with
interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  // --- A. PARTIAL ---
  // Makes all properties optional. Good for updates.
  const updateEmployee = (updates: Partial<Employee>) => {
    console.log("A. Partial Update:", updates);
  };
  
  // We can pass just name, just email, or nothing.
  updateEmployee({ name: "Vedansh Updated" }); 
  
  
  // --- B. READONLY ---
  // Makes all properties immutable.
  const config: Readonly<Employee> = {
    id: 1,
    name: "Vedansh",
    email: "v@test.com",
    role: "Dev"
  };
  // config.id = 2; // Error
  console.log("B. Readonly Config:", config);
  
  
  // --- C. PICK ---
  // Selects ONLY the specific keys you want.
  type EmployeeContact = Pick<Employee, "name" | "email">;
  
  const contactInfo: EmployeeContact = {
    name: "Vedansh",
    email: "ved@example.com"
    // role: "Dev" // Error: Object literal may only specify known properties
  };
  console.log("C. Pick (Contact Only):", contactInfo);
  
  
  // --- D. OMIT ---
  // Removes specific keys, keeps the rest.
  type EmployeePublicProfile = Omit<Employee, "email" | "id">;
  
  const publicProfile: EmployeePublicProfile = {
    name: "Vedansh",
    role: "Full Stack Dev"
    // email: "..." // Error: 'email' is not allowed here
  };
  console.log("D. Omit (Public Profile):", publicProfile);