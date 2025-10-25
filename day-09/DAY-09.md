# Day-09 of 35-Days-React-Spark

**Date:** 25/10/2025

**Topic:** Building a React Project | BGChanger

**Resource:** ChaiCode YouTube Channel – Video 8\

---

# 🎨 Background Changer Project

A simple React application project that explain state management and event handling by allowing users to change the background color of the page with button clicks.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation & Setup](#installation--setup)
5. [How It Works](#how-it-works)
6. [Code Explanation](#code-explanation)
7. [Key Concepts](#key-concepts)
8. [Common Questions](#common-questions)

## Project Overview

This project is a **Background Changer** application built with React. Users can click on color buttons to instantly change the background color of the entire page. It's a perfect beginner project to understand React state management with `useState` hook.

## Features:

- 11 predefined color options
- Instant background color change on button click
- Clean, responsive UI with Tailwind CSS
- Smooth color transitions

## Technologies Used

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| **React 18+**       | Component-based UI framework   |
| **useState Hook**   | State management for color     |
| **Tailwind CSS**    | Utility-first CSS styling      |
| **Vite**            | Fast build tool and dev server |
| **JavaScript ES6+** | Modern JavaScript features     |

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or Create Project**

```bash
# Create new Vite + React project
npm create vite@latest bg-changer -- --template react

# Navigate to project
cd bg-changer

# Install dependencies
npm install
```

2. **Install Tailwind CSS**

```bash
# Install Tailwind CSS
npm install tailwindcss @tailwindcss/vite
```

3. **Configure the Vite Plugin**

Add the `@tailwindcss/vite` plugin to your Vite configuration.

```javascript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

4. **Import Tailwind CSS**

Add an `@import` to your CSS file that imports Tailwind CSS.

```css
@import "tailwindcss";
```

5. Start your build process

Run your build process with `npm run dev` or whatever command is configured in your `package.json` file.

```bash
npm run dev
```

7. **Open Browser**

```
http://localhost:5173
```

---

## How It Works

```
1. User opens the app
   ↓
2. React initializes state with default color ("olive")
   ↓
3. Background renders with olive color
   ↓
4. User clicks a color button (e.g., "Red")
   ↓
5. onClick event triggers setColor("#9C2007")
   ↓
6. React updates state
   ↓
7. Component re-renders with new color
   ↓
8. Background changes to red
```

## State Management Flow

```
┌─────────────────────────────────────────┐
│  const [color, setColor] = useState()   │
│                                         │
│  Initial State: "olive"                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  User clicks button                     │
│  onClick={() => setColor("#9C2007")}    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  State updates: color = "#9C2007"       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Component re-renders                   │
│  style={{ backgroundColor: "#9C2007" }} │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Background turns red                   │
└─────────────────────────────────────────┘
```

## Code Explanation

### Component Structure

```jsx
function App() {
  // 1. State Declaration
  const [color, setColor] = useState("olive");

  return (
    <>
      {/* 2. Page Title */}
      <h1 className="text-3xl font-bold underline text-center">BG Changer</h1>

      {/* 3. Full-screen Background Container */}
      <div
        className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        {/* 4. Button Container */}
        <div className="fixed flex flex-wrap top-16 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg px-3 py-2 bg-amber-50 rounded-2xl">
            {/* 5. Color Buttons */}
            <button
              onClick={() => setColor("#9C2007")}
              style={{ backgroundColor: "#9C2007" }}
              className="outline-none px-3 py-1 rounded-full text-white shadow-sm"
            >
              Red
            </button>

            {/* ... more buttons ... */}
          </div>
        </div>
      </div>
    </>
  );
}
```

### Important Parts of the Project

#### 1. State Declaration

```jsx
const [color, setColor] = useState("olive");
```

**What it does:**

- Creates a state variable called `color`
- Initial value is `"olive"`
- `setColor` is the function to update this state
- When state changes, component re-renders

#### 2. Dynamic Background

```jsx
<div
  className="w-full h-screen duration-200"
  style={{ backgroundColor: color }}
>
```

**Explanation:**

- `w-full h-screen`: Full width and height (covers entire viewport)
- `duration-200`: Smooth color transition (200ms)
- `style={{ backgroundColor: color }}`: Inline style that uses state value
- When `color` state changes, background color updates automatically

#### 3. Button Event Handler

```jsx
<button
  onClick={() => setColor("#9C2007")}
  style={{ backgroundColor: "#9C2007" }}
  className="outline-none px-3 py-1 rounded-full text-white shadow-sm"
>
  Red
</button>
```

**Explanation:**

- `onClick={() => setColor("#9C2007")}`: Arrow function that calls setColor
- Arrow function is necessary to prevent immediate execution
- `style={{ backgroundColor: "#9C2007" }}`: Button color matches the color it sets
- When clicked, updates state → triggers re-render → background changes

#### 4. Why Arrow Function?

```jsx
// WRONG - Executes immediately on render
<button onClick={setColor("#9C2007")}>

// CORRECT - Executes only when clicked
<button onClick={() => setColor("#9C2007")}>
```

## Key Concepts

### 1. useState Hook

```jsx
const [color, setColor] = useState("olive");
```

**What is useState?**

- A React Hook that adds state to functional components
- Returns an array with two elements: [stateValue, setterFunction]
- State persists between re-renders
- Changing state triggers re-render

**Syntax:**

```jsx
const [variable, setVariable] = useState(initialValue);
```

---

### 2. Event Handling

```jsx
onClick={() => setColor("#9C2007")}
```

**Why arrow function?**

- Without arrow function: `onClick={setColor("#9C2007")}` executes immediately
- With arrow function: `onClick={() => setColor("#9C2007")}` executes on click
- Arrow function creates a callback that React will call when event occurs

**Equivalent ways:**

```jsx
// Method 1: Inline arrow function
<button onClick={() => setColor("red")}>

// Method 2: Separate function
function handleRedClick() {
  setColor("red");
}
<button onClick={handleRedClick}>

// Method 3: Function returning a function
const handleColorChange = (newColor) => () => {
  setColor(newColor);
}
<button onClick={handleColorChange("red")}>
```

### 3. Inline Styles vs CSS Classes

```jsx
// Inline style (dynamic value from state)
<div style={{ backgroundColor: color }}>

// CSS classes (static styling)
<div className="w-full h-screen duration-200">
```

**When to use inline styles:**

- Dynamic values from state/props
- Values that change frequently
- Component-specific styling

**When to use CSS classes:**

- Static styling
- Responsive design
- Reusable styles

### 4. Component Re-rendering

```jsx
const [color, setColor] = useState("olive");

// When setColor is called:
// 1. State updates
// 2. Component function runs again
// 3. New JSX returned
// 4. React updates DOM efficiently
```

**Re-render triggers:**

- State changes (setColor)
- Props changes
- Parent component re-renders

---

## Common Questions

### Q1: Why does the page color become olive when I refresh?

**Answer:**

```jsx
const [color, setColor] = useState("olive");
```

When you refresh the page, the component **resets** and initializes from scratch. React looks at your `useState("olive")` and sets the initial state to `"olive"`.

**Key Points:**

1. **Page refresh = component unmount + remount**
2. **State is not persistent across page reloads** (unless you use localStorage)
3. **The value in `useState()` is the default/initial value**
4. **Every time component mounts, state starts with this default value**

**Detailed Explanation:**

```
User Refreshes Page
    ↓
Browser reloads HTML/JS
    ↓
React application starts fresh
    ↓
App component mounts
    ↓
useState("olive") executes
    ↓
color state initialized to "olive"
    ↓
Component renders with olive background
```

**If you want to persist the color from localstorage:**

```jsx
import { useState, useEffect } from "react";

function App() {
  // Try to get saved color, or use "olive" as default
  const [color, setColor] = useState(() => {
    return localStorage.getItem("bgColor") || "olive";
  });

  // Save color whenever it changes
  useEffect(() => {
    localStorage.setItem("bgColor", color);
  }, [color]);

  // ... rest of code
}
```

Now the selected color will persist even after page refresh.

### Q2: Why use an arrow function in onClick?

**Answer:**

```jsx
// WRONG - Executes immediately during render
<button onClick={setColor("#9C2007")}>
  Red
</button>

// CORRECT - Executes only when clicked
<button onClick={() => setColor("#9C2007")}>
  Red
</button>
```

**Without arrow function:**

- `setColor("#9C2007")` runs immediately when component renders
- It updates state during render → triggers another render → infinite loop!
- React will show an error: "Too many re-renders"

**With arrow function:**

- `() => setColor("#9C2007")` creates a function but doesn't call it
- React stores this function
- When button is clicked, React calls the function
- State updates → re-render happens once

### Q3: Can I use CSS classes for colors instead of inline styles?

**Answer:**

Yes, but you'd need to create classes for each color:

```jsx
// Approach 1: Dynamic classes (more complex)
<div className={`w-full h-screen bg-${color}`}>

// Approach 2: Conditional classes
<div className={`w-full h-screen ${color === 'red' ? 'bg-red-500' : 'bg-olive'}`}>

// Approach 3: Inline style (simplest for dynamic colors)
<div style={{ backgroundColor: color }}>
```

**Recommendation:** Stick with inline styles for dynamic background because:

- Simpler code
- Works with any hex color
- No need to create classes for every color
- Direct state-to-style mapping

### Q4: What if I want to add more colors?

**Answer:**

Simply add more buttons following the same pattern:

```jsx
<button
  style={{ backgroundColor: "#FF5733" }}
  className="text-white px-3 py-1 rounded-full shadow-sm outline-none"
  onClick={() => setColor("#FF5733")}
>
  Orange
</button>

<button
  style={{ backgroundColor: "#33FF57" }}
  className="text-black px-3 py-1 rounded-full shadow-sm outline-none"
  onClick={() => setColor("#33FF57")}
>
  Lime Green
</button>
```

**Will add this features in Upcomin Days**

**Pro Tip:** You can refactor this into an array:

```jsx
const colors = [
  { name: "Red", hex: "#9C2007", textColor: "white" },
  { name: "Green", hex: "#057034", textColor: "white" },
  { name: "Orange", hex: "#FF5733", textColor: "white" },
  // ... more colors
];

return (
  <div className="flex flex-wrap justify-center gap-3">
    {colors.map((colorObj) => (
      <button
        key={colorObj.name}
        style={{ backgroundColor: colorObj.hex }}
        className={`text-${colorObj.textColor} px-3 py-1 rounded-full shadow-sm outline-none`}
        onClick={() => setColor(colorObj.hex)}
      >
        {colorObj.name}
      </button>
    ))}
  </div>
);
```

### Q5: How does the `duration-200` class work?

**Answer:**

```jsx
<div className="w-full h-screen duration-200">
```

`duration-200` is a Tailwind CSS class that adds a CSS transition:

```css
/* Compiled CSS */
.duration-200 {
  transition-duration: 200ms;
}
```

**What it does:**

- When background color changes, instead of instant change...
- Color smoothly transitions over 200 milliseconds (0.2 seconds)
- Creates a pleasant visual effect

**Without transition:**

```
Color: Olive → [INSTANT] → Red
```

**With transition:**

```
Color: Olive → [SMOOTH FADE] → Red (over 200ms)
```

### Q6: What does `inset-x-0` mean?

**Answer:**

```jsx
<div className="fixed flex flex-wrap top-16 inset-x-0 px-2">
```

`inset-x-0` is Tailwind shorthand for:

```css
left: 0;
right: 0;
```

**Complete positioning breakdown:**

- `fixed`: Position fixed relative to viewport
- `top-16`: 4rem (64px) from top
- `inset-x-0`: Left edge = 0, Right edge = 0 (horizontally centered)
- `px-2`: Padding on left and right

**Result:** Button container is fixed at top-center of the screen and spans full width.

## Learning Outcomes

After completing this project, i have understand:

### 1. React Fundamentals

- How to use `useState` hook
- State management in functional components
- How state changes trigger re-renders
- Component lifecycle basics

### 2. Event Handling

- onClick event handlers
- Why to use arrow functions in event handlers
- Passing arguments to event handlers
- Preventing immediate function execution

### 3. Dynamic Styling

- Using inline styles with state
- Mixing inline styles with Tailwind classes
- Dynamic color changes
- CSS transitions for smooth effects

### 4. Tailwind CSS

- Utility-first CSS approach
- Responsive design classes
- Layout classes (flex, positioning)
- Styling classes (shadows, rounded corners)

## Project Summary

This Background Changer project is perfect for:

- Learning React state management
- Understanding event handling
- Practicing Tailwind CSS
- Building interactive UIs
- Understanding component re-rendering

**Key Takeaway:** This simple project explains fundamental React concepts that you'll use in every React application you build.

### Related Concepts i have to Explore Next

- useEffect hook
- localStorage integration
- Component props
- CSS animations
- Custom hooks

## Additional Resources

### Official Documentation

- [React useState Hook](https://react.dev/reference/react/useState)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Event Handling](https://react.dev/learn/responding-to-events)
