// ---- Interfaces ----

// Represents a normal user with name and age
interface User {
    name: string;
    age: number;
  }
  
  // Represents an admin with name and department
  interface Admin {
    name: string;
    department: string;
  }
  
  // Union type: can be either User or Admin
  // Allows handling both with type narrowing
  type UserOrAdmin = User | Admin;
  
  // Function to greet either a User or an Admin
  function greet(user: UserOrAdmin) {
    console.log(user.name);
  
    // Narrowing: check if 'age' exists → it's a User
    if ("age" in user) {
      console.log("Age:", user.age);
    }
  
    // Narrowing: check if 'department' exists → it's an Admin
    if ("department" in user) {
      console.log("Department:", user.department);
    }
  }
  
  // Example: Admin type object assigned to UserOrAdmin
  const user1: UserOrAdmin = {
    name: "ved",
    department: "Engineering",
  };
  
  greet(user1);
  
  // ---- Array Examples ----
  
  let arr: number[] = [1, 2, 3];
  let names: string[] = ["a", "b", "c"];
  
  // Alternative array syntax using generic Array<T>
  let arr2: Array<number> = [1, 2, 3];
  let names2: Array<string> = ["a", "b", "c"];
  
  // Union type array: can contain both numbers and strings
  let mixed: (number | string)[] = [1, "hello", 3, "world"];
  let mixes: (number | string)[] = [1, "fello", 2, 4];
  
  // Read-only array examples
  const numbers: readonly number[] = [1, 2, 3];
  // numbers.push(4); // ❌ Error: cannot modify readonly array
  
  const nums: ReadonlyArray<number> = [1, 2, 3];
  
  // Multi-dimensional array example
  let matrix: number[][] = [
    [1, 2],
    [3, 4],
  ];
  
  // ---- Voters Example ----
  
  interface Voters {
    name: string;
    age: number;
  }
  
  const voters: Voters[] = [
    { name: "Vedansh", age: 21 },
    { name: "Sharma", age: 1 },
    { name: "aavara", age: 96 },
  ];
  
  console.log();
  
  // Simple loop to check voting eligibility
  for (const voter of voters) {
    if (voter.age > 18) {
      console.log(`${voter.name} can vote`);
    } else {
      console.log(`${voter.name} cannot vote`);
    }
  }
  
  console.log("");
  
  // Filtering only eligible voters
  voters
    .filter((voter) => voter.age > 18)
    .forEach((voter) => console.log(`${voter.name} can vote`));
  
  console.log("");
  
  // Using forEach for same logic
  voters.forEach((voter) => {
    if (voter.age > 18) {
      console.log(`${voter.name} can vote`);
    } else {
      console.log(`${voter.name} cannot vote`);
    }
  });
  
  // ---- Good/Bad Interface Union Example ----
  
  interface Good {
    name: string;
    age: number;
  }
  
  interface Bad {
    name: string;
    department: string;
  }
  
  // Union type combining both
  type Combiner = Good | Bad;
  
  // Object with both fields — still valid due to union type
  const user: Combiner = {
    name: "ved",
    age: 21,
    department: "CSE",
  };
  
  if ("age" in user) {
    console.log(user.age);
  }

  console.log();
  
  // Similar greeting function using type narrowing
  function greet1(user: Combiner): void {
    console.log(user.name);
  
    if ("age" in user) {
      console.log(user.age);
    }
  
    if ("department" in user) {
      console.log(user.department);
    }
  }
  
  greet(user);
  
  // ---- Function to Sum Ages ----
  console.log();

  interface Users {
    name: string;
    age: number;
  }
  
  function sumOfAge(a: Users, b: Users): number {
    return a.age + b.age;
  }
  
  // Calling sumOfAge with two user objects
  const result = sumOfAge(
    {
      name: "vedansh",
      age: 22,
    },
    {
      name: "sharma",
      age: 32,
    }
  );
  
  console.log(result);
  