# FirstProject

A TypeScript tutorial project demonstrating basic TypeScript concepts including variables, functions, callbacks, and asynchronous operations.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- TypeScript compiler (`tsc`)

### Installation

1. Install TypeScript globally (if not already installed):

```bash
npm install -g typescript
```

2. Install project dependencies (if any):

```bash
npm install
```

### Compilation

Compile TypeScript to JavaScript:

```bash
tsc
```

The compiled JavaScript files will be generated in the `dist/` directory.

### Running the Code

After compilation, run the JavaScript file:

```bash
node dist/index.js
```

Or use `ts-node` to run TypeScript directly:

```bash
npx ts-node src/index.ts
```

## 📝 Features

This project demonstrates:

- **Basic Variables**: Type annotations and const declarations
- **Functions**: Regular functions and arrow functions
- **Function Callbacks**: Passing functions as arguments
- **Async Operations**: setTimeout and delayed function execution
- **Type Safety**: TypeScript's type system in action

## ⚙️ TypeScript Configuration

The project uses a strict TypeScript configuration with:

- Source files in `src/` directory
- Compiled output in `dist/` directory
- Source maps enabled for debugging
- Declaration files generated for type definitions

## 📦 What Gets Committed

Only source files are committed to version control:

- ✅ `.ts` files (TypeScript source)
- ✅ `tsconfig.json` (configuration)
- ✅ `package.json` (dependencies)
- ❌ `.js` files (compiled output - ignored)
- ❌ `dist/` folder (compiled output - ignored)
