# TypeScript Tutorials

A comprehensive collection of TypeScript tutorial projects and examples covering fundamental to advanced concepts, along with practical React + TypeScript applications.

## Projects

### 1. **FirstProject** - TypeScript Fundamentals

A hands-on exploration of TypeScript fundamentals including:

- Basic types and type annotations
- Interfaces and type unions
- Objects and classes
- Generics and advanced generics
- Enums
- Arrow functions and modern syntax
- Decorators
- Advanced TypeScript features

**Tech Stack**: TypeScript, Node.js

---

### 2. **OTP-Generator** - Secure OTP Generator

A React + TypeScript application that generates secure one-time passwords with customizable options.

**Features**:

- Customizable OTP length (4-12 characters)
- Numeric or alphanumeric options
- Auto-expiration timer (30 seconds)
- Visual countdown indicator
- Modern, clean UI

**Tech Stack**: React, TypeScript, Vite, Tailwind CSS

---

### 3. **GithubStreakChecker** - GitHub Contribution Tracker

A React widget that checks if a GitHub user has contributed today by tracking their public activity.

**Features**:

- Real-time contribution status (Active/Pending)
- Last contribution time and repository
- Tracks Push, Pull Request, Create, and Issue events
- GitHub-inspired dark theme UI
- API integration with GitHub Events API

**Tech Stack**: React, TypeScript, Vite, Tailwind CSS

---

### 4. **Calculator** - Functional Calculator

A fully functional calculator application with keyboard support and modern UI.

**Features**:

- Basic arithmetic operations (+, -, \*, /)
- Decimal number support
- Clear and backspace functionality
- Keyboard shortcuts support
- Modern dark theme UI
- Type-safe operator handling

**Tech Stack**: React, TypeScript, Vite, Tailwind CSS

---

### 5. **Tracker** - Habit Tracker

A beautiful, minimalist habit tracking application to build consistency and track daily habits.

**Features**:

- Add & manage habits
- Daily completion tracking
- Streak counter with visual indicators
- Local storage persistence
- Modern dark theme with emerald accents
- Responsive design

**Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Lucide React

---

## Getting Started

Each project contains its own README with specific setup and usage instructions. Navigate to the project folder for detailed information.

### General Setup

Most React projects follow this pattern:

```bash
cd <project-name>
npm install
npm run dev
```

For the **FirstProject** (TypeScript-only):

```bash
cd FirstProject
npm install
npm run build
# or
npx ts-node src/Index.ts
```

## Project Structure

```
TypeScriptTutorials/
├── FirstProject/          # Comprehensive TypeScript tutorial covering core concepts
│   ├── src/               # TypeScript source files
│   ├── dist/              # Compiled JavaScript output
│   └── tsconfig.json      # TypeScript configuration
│
├── OTP-Generator/         # React + TypeScript OTP generator application
│   └── src/               # React components and source files
│
├── GithubStreakChecker/   # GitHub contribution streak checker widget
│   └── src/               # React components and GitHub API integration
│
├── Calculator/            # Functional calculator with keyboard support
│   └── src/               # Calculator component and logic
│
├── Tracker/               # Habit tracking application
│   └── src/               # Habit tracker components and logic
│
└── README.md              # This file
```

## Learning Path

1. **Start with FirstProject** - Learn TypeScript fundamentals through hands-on examples
2. **Build React Apps** - Apply TypeScript knowledge in React applications:
   - OTP-Generator (simple state management)
   - Calculator (complex logic and keyboard handling)
   - GithubStreakChecker (API integration)
   - Tracker (local storage and date manipulation)

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Node.js** - Runtime environment

## Note

The code examples in this repository are AI-generated for educational purposes to provide clear, well-structured examples that demonstrate TypeScript concepts effectively. However, the initial implementations were written manually and have been refined with AI assistance to improve code quality and understanding.
