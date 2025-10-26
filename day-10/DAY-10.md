# Day-10 of 35-Days-React-Spark

**Date:** 26/10/2025

**Topic:** useEffect, useRef and useCallback with 1 Project (Password Generator)

**Resource:** ChaiCode YouTube Channel – Video 10

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Hooks Learned & Applied](#hooks-learned--applied)
3. [Key Concepts Learned](#key-concepts-learned)
4. [Features Implemented](#features-implemented)
5. [How It Works](#how-it-works)
6. [Complete Code Walkthrough](#complete-code-walkthrough)
7. [Challenges Faced & Solutions](#challenges-faced--solutions)
8. [Performance Optimizations](#performance-optimizations)
9. [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)
10. [Interview Questions](#interview-questions)
11. [What I Learned](#what-i-learned)

---

## Project Overview

Built a **Password Generator** web application that allows users to:

- Generate random secure passwords

- Customize password length (8-100 characters)

- Include/exclude numbers

- Include/exclude special characters

- Copy generated password to clipboard with one click

## Hooks Learned & Applied

### 1. useState (State Management)

**Purpose:** Manage component state

```javascript
const [length, setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const [characterAllowed, setCharacterAllowed] = useState(false);
const [password, setPassword] = useState("");
```

**What each state does:**

- `length`: Tracks password length (default: 8, range: 8-100)
- `numberAllowed`: Boolean for including numbers (0-9)
- `characterAllowed`: Boolean for including special characters
- `password`: Stores the generated password string

**Why multiple useState instead of one object?**

- Each state is independent
- More granular re-renders
- Easier to update individual pieces
- Clearer code intent

### 2. useCallback (Performance Optimization)

**Purpose:** Memoizes functions to prevent unnecessary recreation

#### Password Generator Function

```javascript
const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (numberAllowed) str += "0123456789";
  if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`";

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length);
    pass += str.charAt(char);
  }

  setPassword(pass);
}, [length, numberAllowed, characterAllowed, setPassword]);
```

**Why useCallback here?**

Without useCallback:

```javascript
// Problem
function Component() {
  const passwordGenerator = () => { ... }; // New function EVERY render

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]); // Different function each time → infinite loop!
}
```

With useCallback:

```javascript
// Solution
const passwordGenerator = useCallback(() => { ... }, [deps]);
// Same function reference unless deps change
// useEffect runs only when dependencies actually change
```

**Benefits:**

- Memoizes passwordGenerator function
- Without useCallback: Function recreated on EVERY render
- With useCallback: Function only recreated when dependencies change
- Prevents unnecessary function recreation on every render
- Prevents infinite loops with useEffect
- Only recreates when dependencies change (length, numberAllowed, characterAllowed)
- Optimizes performance
- Stable function reference for child components

#### Copy to Clipboard Function

```javascript
const copyPasswordToClipBoard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, password.length);
  window.navigator.clipboard.writeText(password);
}, [password]);
```

**Why useCallback here?**

- Function only recreates when `password` changes
- No need to recreate copy function if password is same
- Performance optimization for button click handler

### 3. useEffect (Side Effects)

**Purpose:** Runs code after render based on dependencies

```javascript
useEffect(() => {
  passwordGenerator();
}, [length, numberAllowed, characterAllowed, passwordGenerator]);
```

**What happens:**

1. **On component mount:**

   - useEffect runs → calls passwordGenerator()
   - Initial password generated

2. **When length slider moves:**

   - `length` state changes
   - useEffect detects change in dependency
   - Calls passwordGenerator() again
   - New password generated with new length

3. **When checkbox toggled:**
   - `numberAllowed` or `characterAllowed` changes
   - useEffect runs → new password generated

**Why this dependency array?**

```javascript
[length, numberAllowed, characterAllowed, passwordGenerator];
```

- `length` changes → need new password with different length
- `numberAllowed` changes → need new password with/without numbers
- `characterAllowed` changes → need new password with/without special chars
- `passwordGenerator` changes → function logic might have changed

**What if we used empty array `[]`?**

```javascript
useEffect(() => {
  passwordGenerator();
}, []); // Only runs once on mount

// Problem: Changing length/options won't regenerate password
```

**What it does:**

- Automatically generates password on component mount
- Re-generates when length or options change
- Watches dependency array for changes [length, numberAllowed, characterAllowed, passwordGenerator]

### 4. useRef (DOM References)

**Purpose:** Direct access to DOM elements without causing re-renders

```javascript
const passwordRef = useRef(null);

// Usage in JSX
<input type="text" value={password} ref={passwordRef} readOnly />;

// Usage in function
const copyPasswordToClipBoard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, password.length);
  window.navigator.clipboard.writeText(password);
}, [password]);
```

**Why useRef instead of useState?**

| Feature                  | useRef                   | useState                       |
| ------------------------ | ------------------------ | ------------------------------ |
| Causes re-render         | No                       | Yes                            |
| Persists between renders | Yes                      | Yes                            |
| Access DOM directly      | Yes                      | No                             |
| Use case                 | DOM manipulation, timers | Component data that affects UI |

**Why useRef is better:**

- References the password input field
- Allows direct DOM manipulation (select text)
- Used for copy-to-clipboard functionality
- Works with React's virtual DOM
- Doesn't break during re-renders
- Safe with React lifecycle
- Cleaner code

**useRef for DOM access:**

```javascript
// ✅ React way with useRef
const inputRef = useRef(null);
inputRef.current.select();

// ❌ Vanilla JS way (not recommended in React)
document.getElementById("input").select();
```

## Key Concepts Learned

### 1. Memoization

- Caching function/value to avoid recomputation
- useCallback memoizes functions
- useMemo memoizes values

**Two types in React:**

```javascript
// useCallback - memoizes FUNCTIONS
const memoizedFunction = useCallback(() => {
  return expensiveOperation();
}, [dependencies]);

// useMemo - memoizes VALUES
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

**When to use:**

- useCallback: When passing functions to child components or useEffect
- useMemo: When computing expensive values

**Example comparison:**

```javascript
// Without memoization (recreates every render)
function Component() {
  const handleClick = () => console.log("clicked"); // New function
  const total = items.reduce((sum, item) => sum + item.price, 0); // Recalculates

  return <Child onClick={handleClick} total={total} />;
}

// With memoization (only recreates when needed)
function Component() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // Same function reference

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]); // Only recalculates when items change

  return <Child onClick={handleClick} total={total} />;
}
```

### 2. Dependency Arrays

**Three types of useEffect behavior:**

```javascript
// 1. Run only once on mount
useEffect(() => {
  console.log("Component mounted");
}, []); // Empty array

// 2. Run when specific value (Here, Count) changes
useEffect(() => {
  console.log("Count changed:", count);
}, [count]); // Runs when count changes

// 3. Run on every render (avoid this)
useEffect(() => {
  console.log("Every render");
}); // No array - performance issue
```

**Dependency array rules:**

```javascript
useEffect(() => {
  // If you use any value from props or state here...
  console.log(count, name);

  // ...you MUST include it in dependency array
}, [count, name]); // ✅ Correct

// ❌ Wrong - missing dependencies
}, []); // React will warn you
```

### 3. Optional Chaining

**Syntax:** `?.`

**Purpose:** Safely access properties that might be null/undefined

**In our app:**

```javascript
// With optional chaining
// Safely access properties even if ref.current is null
passwordRef.current?.select();
passwordRef.current?.setSelectionRange(0, 999);
// The "?." is optional chaining
// Prevents errors if ref not yet attached

// Why needed?
// - On first render, ref might not be attached yet
// - Prevents "Cannot read property of null" errors
// - Cleaner than if statements

// Equivalent to:
if (passwordRef.current) {
  passwordRef.current.select();
}
// Without optional chaining
```

**More examples:**

```javascript
// Nested properties
user?.address?.street; // Safe navigation

// Function calls
onSubmit?.(); // Call function only if it exists

// Array access
items?.[0]?.name; // Safe array and property access
```

### 4. Functional State Updates

**Problem with direct updates:**

```javascript
// ❌ Can cause bugs
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  // Only increments by 1, not 2
}
```

**Solution with functional updates:**

```javascript
// ✅ Works correctly
function handleClick() {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  // Increments by 2!
}
```

**In Our App**

```javascript
// Good - Uses previous state
setNumberAllowed((prev) => !prev);

// Avoid - Can cause issues with batching
setNumberAllowed(!numberAllowed);
```

**Why functional updates are safer:**

- Always uses latest state value
- Works correctly with batching
- Prevents stale closure issues
- Required when new state depends on old state

## Features Implemented

- Dynamic password generation

- Customizable length (8-100 chars)

- Toggle numbers (0-9)

- Toggle special characters (!@#$%^&\*-\_+=[]{}~`)

- Copy to clipboard functionality

- Visual feedback on copy (text selection)

- Responsive design with Tailwind CSS

- Real-time password updates

## How It Works

### Password Generation Algorithm

```javascript
1. Start with base string: A-Z, a-z
       str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
2. If numbers allowed: Add 0-9
       if (numberAllowed) str += "0123456789"
3. If characters allowed: Add special chars
       if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`"
4. Loop 'length' times: (Generate password)
   - Get random index
   - Pick character at that index
   - Add to password
   - Loop
       for (i = 1; i <= length; i++) {
       randomIndex = Math.floor(Math random() * str.length)
       password += str.charAt(randomIndex)
       }
5. Set password state
       setPassword(password)

```

### Copy to Clipboard Flow

```javascript
1. User clicks "Copy" button
       copyPasswordToClipBoard() executes
3. passwordRef.current.select()
       (Highlights password text in input)
4. passwordRef.current.setSelectionRange(0, password.length)
       (Ensures full text selected)
5. window.navigator.clipboard.writeText(password)
       (Copies to clipboard)

6. User sees selected text (visual feedback)
```

---

## Complete Code Walkthrough

### Full Component with Comments

```javascript
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // ----- STATE MANAGEMENT -----

  // Track password length (8-100)
  const [length, setLength] = useState(8);

  // Track if numbers should be included
  const [numberAllowed, setNumberAllowed] = useState(false);

  // Track if special characters should be included
  const [characterAllowed, setCharacterAllowed] = useState(false);

  // Store the generated password
  const [password, setPassword] = useState("");

  // ----- REF FOR DOM ACCESS -----

  // Reference to password input field for selection/copy
  const passwordRef = useRef(null);

  // ----- PASSWORD GENERATION -----

  // Memoized function to generate password
  // Only recreates when dependencies change
  const passwordGenerator = useCallback(() => {
    let pass = "";

    // Start with alphabet (uppercase and lowercase)
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Add numbers if allowed
    if (numberAllowed) str += "0123456789";

    // Add special characters if allowed
    if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`";

    // Generate password of specified length
    for (let i = 1; i <= length; i++) {
      // Get random index within string length
      let charIndex = Math.floor(Math.random() * str.length);

      // Add random character to password
      pass += str.charAt(charIndex);
    }

    // Update password state
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  // ----- COPY TO CLIPBOARD -----

  // Memoized function to copy password
  // Only recreates when password changes
  const copyPasswordToClipBoard = useCallback(() => {
    // Select text in input field (visual feedback)
    passwordRef.current?.select();

    // Set selection range for better mobile support
    passwordRef.current?.setSelectionRange(0, password.length);

    // Copy to clipboard using browser API
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // ------ AUTO-GENERATE PASSWORD ------

  // Run passwordGenerator when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  // ------RENDER UI--------

  return (
    <>
      {/* Main container */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white my-3">
          Password Generator
        </h1>

        {/* Password display and copy button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex text-sm gap-x-2">
          {/* Length slider */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label htmlFor="range" className="text-white">
              Length: {length}
            </label>
          </div>

          {/* Numbers checkbox */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>

          {/* Characters checkbox */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
```

---

## Challenges Faced & Solutions

### Challenge 1: Infinite Re-render Loop

**Problem:**

```javascript
// This caused infinite loop
const passwordGenerator = () => { ... };

useEffect(() => {
  passwordGenerator();
}, [passwordGenerator]); // passwordGenerator is new every render
```

**What happened:**

1. Component renders → passwordGenerator function created
2. useEffect runs (dependency changed)
3. passwordGenerator called → setPassword
4. State changes → component re-renders
5. New passwordGenerator function created
6. Back to step 2 → Infinite loop

**Solution:**

```javascript
// useCallback breaks the loop
const passwordGenerator = useCallback(() => {
  // ...
}, [length, numberAllowed, characterAllowed, setPassword]);

// Now function reference stays same unless dependencies change
```

**Always wrap functions in useCallback when using them as useEffect dependencies**

### Challenge 2: Password Not Copying on First Click

**Problem:**

```javascript
// Ref might be null initially
const copyPasswordToClipBoard = () => {
  passwordRef.current.select(); // Error: Cannot read property 'select' of null
};
```

**What happened:**

- On very first render, ref hasn't attached to DOM element yet
- Trying to access `.select()` on null → crash

**Solution:**

```javascript
// Optional chaining prevents error
const copyPasswordToClipBoard = useCallback(() => {
  passwordRef.current?.select(); // Safe - does nothing if null
  passwordRef.current?.setSelectionRange(0, password.length);
  window.navigator.clipboard.writeText(password);
}, [password]);
```

**Always use optional chaining (`?.`) when accessing refs**

### Challenge 3: State Not Updating Correctly

**Problem:**

```javascript
// This didn't work as expected
<input type="checkbox" onChange={() => setNumberAllowed(!numberAllowed)} />
```

**What happened:**

- React batches state updates
- `numberAllowed` value might be stale in closure
- Led to inconsistent checkbox behavior

**Solution:**

```javascript
// Functional update always uses latest state
<input type="checkbox" onChange={() => setNumberAllowed((prev) => !prev)} />
```

**Use functional updates when new state depends on old state**

### Challenge 4: Range Input Returning String

**Problem:**

```javascript
// length becomes string "50" instead of number 50
<input
  type="range"
  value={length}
  onChange={(e) => setLength(e.target.value)}
/>
```

**What happened:**

- `e.target.value` always returns string
- `"50" !== 50` (different types)
- Caused issues in calculations

**Solution:**

```javascript
// Convert to number explicitly
<input
  type="range"
  value={length}
  onChange={(e) => setLength(Number(e.target.value))}
/>
```

**Always convert form input values to correct type**

### Challenge 5: Understanding Dependency Arrays

**Problem:**

```javascript
// Missing dependencies
useEffect(() => {
  passwordGenerator();
}, []); // React warning: missing dependencies
```

**What happened:**

- Password only generated on mount
- Changing length/options didn't regenerate password
- App felt broken to user

**Solution:**

```javascript
// Include all dependencies
useEffect(() => {
  passwordGenerator();
}, [length, numberAllowed, characterAllowed, passwordGenerator]);
```

**Always include all used values in dependency array**

### Challenge 6: Copy Not Showing Visual Feedback

**Problem:**

- Password copied but no visual indication
- User unsure if copy actually worked

**Initial attempt:**

```javascript
const copyPasswordToClipBoard = () => {
  window.navigator.clipboard.writeText(password);
  // No visual feedback
};
```

**Solution:**

```javascript
// Select text for visual feedback
const copyPasswordToClipBoard = useCallback(() => {
  passwordRef.current?.select(); // Highlights text
  passwordRef.current?.setSelectionRange(0, password.length); // Full selection
  window.navigator.clipboard.writeText(password);
}, [password]);
```

**Always provide visual feedback for user actions.**

---

## Why useCallback for passwordGenerator?

**Without useCallback:**

- Function recreated on EVERY render
- New function reference each time
- useEffect sees "new" function → runs again
- Could cause infinite loop or performance issues

**With useCallback:**

- Function memoized (cached)
- Same reference unless dependencies change
- useEffect only runs when actually needed
- Performance optimized

## Performance Optimizations

1. **useCallback for passwordGenerator**

- Prevents function recreation

- Reduces unnecessary re-renders

- Prevents unnecessary useEffect triggers

**Without optimization:**

```javascript
// Function recreated every render
const passwordGenerator = () => { ... };

// If component has 100 renders → 100 new functions created
// Memory waste + garbage collection overhead
```

**With optimization:**

```javascript
// Function memoized
const passwordGenerator = useCallback(() => { ... }, [deps]);

// Function created once, reused for all renders
// Only recreates when dependencies actually change
```

2. **useCallback for copyPasswordToClipBoard**

- Memoizes copy function
- Only recreates when password changes

**Why it matters:**

```javascript
// Without useCallback, this function recreates every render
// Even if password hasn't changed

const copyPasswordToClipBoard = useCallback(() => {
  // ...
}, [password]); // Only recreates when password changes

// Button always gets same function reference
// React can skip re-rendering button if nothing else changed
```

3. **Functional state updates**

- Uses prev state in setters
- Prevents stale state issues

**Performance benefit:**

```javascript
// ✅ Functional updates are more efficient
setNumberAllowed((prev) => !prev);

// React can batch these better
// Works correctly even with multiple updates in same event
```

4. **Minimal Re-renders**

**State structure optimized:**

```javascript
// Four separate states
const [length, setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const [characterAllowed, setCharacterAllowed] = useState(false);
const [password, setPassword] = useState("");

// Why? Changing length doesn't re-render checkbox components
// Each input only re-renders when its own state changes
```

**Alternative (less optimal):**

```javascript
// One big state object
const [state, setState] = useState({
  length: 8,
  numberAllowed: false,
  characterAllowed: false,
  password: "",
});

// Problem: Changing any value causes entire component to re-render
// All inputs re-render even if their values didn't change
```

---

## Common Pitfalls to Avoid

### 1. Forgetting useCallback with useEffect

```javascript
// WRONG - Infinite loop
const myFunction = () => { ... };

useEffect(() => {
  myFunction();
}, [myFunction]); // myFunction is different every render

// CORRECT
const myFunction = useCallback(() => { ... }, [deps]);

useEffect(() => {
  myFunction();
}, [myFunction]); // Stable reference
```

### 2. Missing Dependencies in useEffect

```javascript
// WRONG - Stale values
useEffect(() => {
  console.log(count); // Uses count
}, []); // But doesn't list count as dependency

// CORRECT
useEffect(() => {
  console.log(count);
}, [count]); // List all used values
```

### 3. Not Using Optional Chaining with Refs

```javascript
// WRONG - Can crash
passwordRef.current.select();

// CORRECT - Safe
passwordRef.current?.select();
```

### 4. Direct State Updates

```javascript
// WRONG - Can cause bugs
setCount(count + 1);

// CORRECT - Always works
setCount((prev) => prev + 1);
```

### 5. Not Converting Input Values

```javascript
// WRONG - String instead of number
onChange={(e) => setLength(e.target.value)} // "8" not 8

// CORRECT
onChange={(e) => setLength(Number(e.target.value))} // 8
```

---

## Interview Questions

### Q1: Why use useCallback here?

**A:** Without useCallback, passwordGenerator would be recreated on every render, causing useEffect to run infinitely since it has passwordGenerator as a dependency.

### Q2: Why useRef instead of querySelector?

**A:** useRef provides direct React way to access DOM, doesn't cause re-renders, and is safer with React's lifecycle.

### Q3: When does useEffect run?

**A:** On mount and whenever any dependency in the array changes (length, numberAllowed, characterAllowed, passwordGenerator).

### Q4: What if we remove passwordGenerator from useEffect dependencies?

**A:** React will warn about missing dependency, and it might not run when generator logic changes.

## What I Learned

1. **Performance matters** - useCallback prevents unnecessary work

2. **Side effects need management** - useEffect handles them properly

3. **Direct DOM access** - useRef for non-state DOM interactions

4. **Dependency management** - Critical for hooks to work correctly

5. **Real-world application** - Combining multiple hooks in one project
