# FirstProject

A comprehensive TypeScript learning project covering fundamental concepts through practical examples.

## Topics Covered

This project explores various TypeScript concepts through example files:

- **Type.ts** - Basic types, type annotations, and type inference
- **Interfaces.ts** - Interface definitions and usage
- **InterfaceWithClass.ts** - Combining interfaces with classes
- **Objects.ts** - Object types and manipulation
- **Generics.ts** - Generic functions and type parameters
- **AdvanceGenerics.ts** - Advanced generic patterns and constraints
- **GenericWithArrow.ts** - Generic functions using arrow function syntax
- **Enums.ts** - Enum types and their usage
- **Advanced.ts** - Advanced TypeScript features and patterns

## 🛠️ Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies (if any)
npm install

# Install TypeScript globally (optional)
npm install -g typescript

# Or use npx to run TypeScript compiler without global installation
```

## 🚀 Usage

### Compile TypeScript

```bash
# Compile all TypeScript files
tsc

# Or using npx
npx tsc
```

### Run Compiled JavaScript

```bash
# Run the compiled output
node dist/index.js

# Or run TypeScript directly with ts-node
npx ts-node src/index.ts
```

### Watch Mode

```bash
# Compile in watch mode (auto-recompiles on changes)
tsc --watch
```

## 📁 Project Structure

```
FirstProject/
├── src/              # TypeScript source files
│   ├── Index.ts      # Main entry point
│   ├── Type.ts       # Basic types examples
│   ├── Interfaces.ts # Interface examples
│   └── ...           # Other concept files
├── dist/             # Compiled JavaScript output (git-ignored)
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies
```

## Note

The code examples in this project are AI-generated for educational purposes to provide clear, well-structured examples that demonstrate TypeScript concepts effectively. However, the initial implementations were written manually and have been refined with AI assistance to improve code quality and understanding.
