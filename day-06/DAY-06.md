# Day-06 of 35-Days-React-Spark

**Date:** 22/10/2025

**Topic:** Virtual DOM, Fibre and Reconciliation

**Resource:** ChaiCode YouTube Channel – Video 6 and [Fibre Resource](https://github.com/acdlite/react-fiber-architecture)

---

## 🎯 Learning Objectives

- Understand what Virtual DOM is, it is relevance today and currently it is used in react or not

- Learn about React Fiber

- Learn about Reconciliation algorithm

- Understand how React updates the UI efficiently

- What is `createRoot()` method and what it does behind the scene?

---

## 📚 Table of Contents

1. [What is Virtual DOM?](#1-what-is-virtual-dom)
2. [Is Virtual DOM Still Relevant?](#2-is-virtual-dom-still-relevant)
3. [Does React Still Use Virtual DOM?](#3-does-react-still-use-virtual-dom)
4. [What is React Fiber?](#4-what-is-react-fiber)
5. [What is Reconciliation?](#5-what-is-reconciliation)
6. [ What is createRoot and what does createRoot() Do?](#6-what-is-createroot-and-what-does-createroot-do)
7. [Why Keys Matter](#7-why-keys-matter)

---

## 🔑 Key Takeaways (From Video 6)

### 1. What is Virtual DOM?

The **Virtual DOM (VDOM)** in React is a lightweight, in-memory representation of the actual Document Object Model (DOM) of a web page. It is a core concept that enables React's efficient rendering and updates.

**Technical Explanation**

Virtual DOM is essentially a **lightweight JavaScript object tree** that represents your UI structure. It's NOT a real DOM, but a JavaScript representation of it.

```javascript
// Virtual DOM is just a JS object like this:
const virtualDOM = {
  type: "div",
  props: {
    className: "container",
    id: "main",
  },
  children: [
    {
      type: "h1",
      props: { className: "title" },
      children: "Hello World",
    },
    {
      type: "button",
      props: { onClick: handleClick },
      children: "Click Me",
    },
  ],
};
```

**Here's how it works:**

- **Representation of UI:** When you build a React component, React creates a Virtual DOM object that mirrors the structure and content of the real DOM elements your component renders. This VDOM is essentially a JavaScript object.

- **State/Prop Changes:** When a component's state or props change, instead of directly manipulating the real DOM, React first updates its in-memory Virtual DOM. It creates a new Virtual DOM tree representing the updated UI.

- **Diffing Algorithm:** React then compares this new Virtual DOM tree with the previous one using a process called "diffing." This algorithm efficiently identifies the minimal set of changes required to update the UI.

- **Reconciliation:** After identifying the changes, React applies only these specific changes to the actual DOM. This process, known as "reconciliation," ensures that only the necessary parts of the real DOM are updated, minimizing the performance impact of direct DOM manipulation.

**Why use the Virtual DOM?**

- **Performance Optimization:** Direct manipulation of the real DOM can be slow and resource-intensive. The Virtual DOM minimizes these operations by batching updates and only applying the necessary changes to the real DOM.

- **Declarative UI:** The Virtual DOM allows developers to describe the desired state of the UI, and React handles the underlying DOM manipulation to achieve that state. This simplifies development and makes the code more predictable.

- **Cross-Platform Compatibility:** The Virtual DOM abstraction allows React to render UIs in different environments, like web browsers (React DOM) and mobile applications (React Native), without requiring developers to write platform-specific DOM manipulation code.

**Why Virtual DOM is Important**

| Real DOM                      | Virtual DOM                        |
| ----------------------------- | ---------------------------------- |
| Heavy JavaScript object       | Lightweight JavaScript object      |
| Direct manipulation is slow   | Manipulation is fast (in memory)   |
| Causes browser reflow/repaint | Changes calculated in memory first |
| Updates entire tree           | Updates only changed nodes         |
| Expensive                     | Cheap                              |

**Key Benefits**

1. **Performance** - Updating JS objects in memory is much cheaper than updating real DOM

2. **Abstraction** - Developers don't need to worry about DOM manipulation

3. **Declarative** - Just describe what you want, React handles how to get there

4. **Cross-platform** - Same concept works for React Native, React VR, etc.

---

### 2. Is Virtual DOM Still Relevant?

**YES, it remains highly relevant and worth studying but with Important Context. It is a foundational concept for widely-used frameworks like React**

**Current Status**

- **Still used in React** (as part of Fiber architecture)

- **Essential interview topic** - Very common question

- **The term is evolving** - Now it's more accurately called "Fiber Trees"

**Should You Study It?**

**Absolutely YES for:**

1. **Interviews**

   - One of the most common React interview questions

   - Understanding it shows deep React knowledge

2. **Performance Optimization**

   - As a core concept for React developers: If you plan on working with React or Vue, a strong understanding of how the Virtual DOM enables the framework's reconciliation process is crucial for optimizing your application and avoiding performance pitfalls.

3. **Debugging**

   - Understanding reconciliation helps fix performance issues

   - Makes React DevTools more meaningful

4. **Architecture Decisions**

   - To go "under the hood": While frameworks handle most Virtual DOM logic for you, knowing the underlying mechanics helps you debug unexpected behavior and write more efficient code, such as using React's memo() hook to prevent unnecessary re-renders.

   - When to use keys

   - When to split components

   - How to structure your app for better performance

**Why the Virtual DOM is still relevant?**

- As the core mechanism for React, understanding the Virtual DOM is essential for any developer working with framework.

- **Simplifies complex UI updates:** The Virtual DOM allows developers to write declarative, state-driven UI code without manually performing slow and complex real DOM manipulations. This is particularly valuable for large, interactive applications.

- **Enhances developer experience:** By abstracting away manual DOM handling, the Virtual DOM streamlines the development process and makes debugging state-to-UI changes more predictable.

- **Offers cross-platform benefits:** The concept is not limited to web browsers. For instance, it provides a consistent basis for tools like React Native, which builds native mobile apps.

**Evolution**

```
2013: Virtual DOM concept introduced
  ↓
2016: Stack Reconciler (synchronous)
  ↓
2017: React Fiber announced (React 16)
  ↓
2022: Concurrent Features (React 18)
  ↓
2025: Still the foundation, but evolved into sophisticated Fiber architecture
```

---

### 3. Does React Still Use Virtual DOM?

**Answer:** Sort of - It's Now Called Fiber Trees.

**The Evolution**

**Before React 16 (Old Virtual DOM):**

- Simple tree structure

- Synchronous updates (blocking)

- No priority system

- Stack Reconciler

**After React 16+ (Fiber Architecture):**

- Sophisticated Fiber Trees

- Asynchronous updates (non-blocking)

- Priority-based scheduling

- Fiber Reconciler

**Two-Tree System**

Modern React maintains **TWO trees simultaneously**:

```
┌─────────────────────────┐         ┌─────────────────────────┐
│   Current Tree          │         │  Work-in-Progress Tree  │
│  (What's on screen)     │◄───────►│  (Being built)          │
│                         │         │                         │
│  Reflects actual DOM    │         │  Where changes happen   │
└─────────────────────────┘         └─────────────────────────┘
        ↑                                      ↓
        │                                      │
        └──────── Swap on commit ─────────────┘
```

**Key Differences**

| Old Virtual DOM    | New Fiber Trees                  |
| ------------------ | -------------------------------- |
| Single tree        | Two trees (Current + WIP)        |
| Synchronous        | Asynchronous (interruptible)     |
| No priorities      | Priority-based updates           |
| All updates equal  | User interactions > data fetches |
| Blocks main thread | Time-sliced rendering            |

---

### 4. What is React Fiber?

**React Fiber** is an implementation of React's core algorithm or you can say new reconciliation engine

The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures (earlier React used to update everything immediately and because of this react animation was getting hit).

React fiber headline feature is incremental rendering of the virtual DOM: the ability to split rendering work into chunks and spread it out over multiple frames.

**Main Goals**

1. **Pause work and come back to it later**

2. **Assign priority to different types of work**

3. **Reuse previously completed work**

4. **Abort work if it's no longer needed**

**The key points are:**

- In a UI, it's not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.

- Different types of updates have different priorities — an animation update needs to complete more quickly than, say, an update from a data store.

- A push-based approach requires the app (you, the programmer) to decide how to schedule work. A pull-based approach allows the framework (React) to be smart and make those decisions for you.

### 5. What is Reconciliation?

**Reconciliation** is the algorithm React uses to **diff one tree with another** to determine which parts need to be changed.

**Simple Explanation**

When you update state (`setState`), React doesn't immediately touch the DOM. Instead:

1. Builds a new Fiber tree (Work-in-Progress)

2. Compares it with the old tree (Current)

3. Generates a list of changes (Effect List)

4. Applies only those changes to the real DOM

**The Reconciliation Process**

```
1. User Action (setState/props change)
   ↓
2. Schedule Update
   ↓
3. Build New Fiber Tree (Work-in-Progress)
   ↓
4. Diffing Algorithm (Compare trees)
   ↓
5. Create Effect List (What changed?)
   ↓
6. Commit Phase (Update real DOM)
   ↓
7. Swap Trees (WIP becomes Current)
```

**Diffing Heuristics (Rules)**

React's diffing algorithm uses these assumptions to optimize performance:

- Rule 1: Different Element Types → Replace Entire Subtree

  ```javascript
  // Old tree
  <div>
    <Counter />
  </div>

  // New tree
  <span>
    <Counter />
  </span>

  // React's action: Destroy entire div and Counter, create new span and Counter
  // Counter loses its state! ❌
  ```

- Rule 2: Same Element Type → Update Props/Attributes Only

  ```javascript
  // Old tree
  <div className="old" title="Old Title">

  // New tree
  <div className="new" title="New Title">

  // React's action: Keep same DOM node, update className and title ✅
  ```

- Rule 3: Component Elements → Recurse on Children

  ```javascript
  // Old tree
  <MyComponent color="red" />

  // New tree
  <MyComponent color="blue" />

  // React's action:
  // - Keep component instance
  // - Update props
  // - Trigger re-render
  // - Recurse on children
  ```

- Rule 4: Lists with Keys → Efficient Reordering

  ```javascript
  // Without keys - Slow ❌
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
  // React recreates all <li> elements even if just one added

  // With keys - Fast ✅
  <ul>
    {items.map(item => <li key={item.id}>{item}</li>)}
  </ul>
  // React reorders existing elements, creates only new ones
  ```

**Why These Rules Matter**

**Performance Impact:**

```javascript
// ❌ Bad - Changes element type
function Component({ isSpecial }) {
  if (isSpecial) {
    return <div>Special content</div>;
  }
  return <span>Normal content</span>;
}
// Result: Entire subtree destroyed and recreated on toggle

// ✅ Good - Keeps same element type
function Component({ isSpecial }) {
  return (
    <div className={isSpecial ? "special" : "normal"}>
      {isSpecial ? "Special" : "Normal"} content
    </div>
  );
}
// Result: Only className attribute updated
```

---

### 6. What is createRoot and what does createRoot() Do?

createRoot is a method in React, introduced in version 18, that creates a "root" for your React application within a browser's Document Object Model (DOM).

It replaces the older ReactDOM.render method, enabling new performance improvements and concurrent rendering features.

**The Code**

```javascript
// In main.jsx (React 18+)
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

**What happens behind the scene:**

1. Creates Fiber Root:

- Initializes the root Fiber node

- Creates container for Fiber trees

- Sets up reconciler

  ```javascript
  // Simplified internal process
  function createRoot(container) {
    // 1. Create FiberRoot object
    const fiberRoot = {
      containerInfo: container, // DOM element
      current: null, // Current tree
      finishedWork: null, // Completed work
      pendingLanes: 0, // Update priorities
    };

    // 2. Create root Fiber node
    const rootFiber = createFiber(HostRoot);

    // 3. Link them together
    fiberRoot.current = rootFiber;
    rootFiber.stateNode = fiberRoot;

    // 4. Initialize update queue
    initializeUpdateQueue(rootFiber);

    return new ReactDOMRoot(fiberRoot);
  }
  ```

2. Creates Two Trees:

- Current Tree (what's displayed)

- Work-in-Progress Tree (being built)

  ```
  createRoot(container)
      ↓
  Creates FiberRootNode
      ↓
  Creates HostRootFiber (Current Tree)
      ↓
  Sets up Work-in-Progress Tree pointer
      ↓
  Initializes Update Queue
      ↓
  Returns root instance
  ```

3. Enables Concurrent Rendering:

- Allows React to pause/resume work

- Priority-based updates

- Better for animations and interactions

- **What you get with createRoot:**

  ```javascript
  // ✅ Automatic Batching
  function handleClick() {
    setCount((c) => c + 1);
    setFlag((f) => !f);
    // Both updates batched together, single re-render
  }

  // ✅ Transitions
  import { startTransition } from "react";

  startTransition(() => {
    setSearchQuery(value); // Low priority update
  });

  // ✅ Suspense for data fetching
  <Suspense fallback={<Loading />}>
    <DataComponent />
  </Suspense>;
  ```

- Old Way vs New Way

  ```javascript
  // ❌ Old Way (React 17 and below)
  import ReactDOM from "react-dom";

  ReactDOM.render(<App />, document.getElementById("root"));

  // Problems:
  // - No concurrent features
  // - No automatic batching in async code
  // - Synchronous rendering only
  // - Legacy mode

  // ✅ New Way (React 18+)
  import { createRoot } from "react-dom/client";

  const root = createRoot(document.getElementById("root"));
  root.render(<App />);

  // Benefits:
  // - Concurrent rendering enabled
  // - Automatic batching everywhere
  // - Transitions support
  // - Suspense improvements
  // - Better error handling
  ```

**Effect List**

During the comparison of the Current Tree and the Working In Progress Tree, React marks fibers that need to be changed and creates an Effect List of them, which will be later used to make changes in the DOM .

```

Effect List = Linked list of only nodes that changed
(Much faster than checking entire tree)

```

**Work Reuse**

Each Fiber has an alternate property that points to the Fiber in another Tree. While creating Work in Progress Tree, React finds out fibers that don't need changes and just clones them from the Current Tree .

This is why React is fast - it doesn't rebuild everything!

**Time Slicing**

```
Without Fiber:
[====Long Task====] → UI frozen during update

With Fiber:
[=Task=] [Browser] [=Task=] [Browser] [=Task=]
↑ UI responsive ↑
```

**What createRoot Initializes**

1. **Fiber Root Node** - Container for entire Fiber tree

2. **Host Root Fiber** - Root of Current tree

3. **Update Queue** - Queue for state updates

4. **Event System** - Modern event delegation

5. **Concurrent Scheduler** - Priority-based task scheduler

6. **Double Buffering System** - Two-tree architecture

---

**The Complete Process**

```
User Action (setState)
    ↓
Schedule Update (Fiber Scheduler)
    ↓
Render Phase (Async - can be interrupted)
├─ Build WIP Tree
├─ Diff with Current Tree
└─ Create Effect List
    ↓
Commit Phase (Sync - cannot be interrupted)
├─ Apply DOM changes
└─ Swap tree pointers
```

### 7. Why Keys Matter

**The Problem Without Keys**

```javascript
// Initial list:
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>

// After adding "Apricot" at position 1:
<ul>
  <li>Apple</li>
  <li>Apricot</li>  ← New item
  <li>Banana</li>
  <li>Cherry</li>
</ul>

// Without keys, React thinks:
// - Position 0: Apple (same) ✓
// - Position 1: Apricot (changed from Banana) → Update ❌
// - Position 2: Banana (changed from Cherry) → Update ❌
// - Position 3: Cherry (new) → Create ❌

// Result: 3 operations instead of 1!
```

**The Solution With Keys**

```javascript
// Initial list with keys:
<ul>
  <li key="1">Apple</li>
  <li key="2">Banana</li>
  <li key="3">Cherry</li>
</ul>

// After adding "Apricot":
<ul>
  <li key="1">Apple</li>
  <li key="4">Apricot</li>  ← New item
  <li key="2">Banana</li>
  <li key="3">Cherry</li>
</ul>

// With keys, React knows:
// - key="1": Apple (same position, same key) ✓
// - key="4": Apricot (new key) → Create ✓
// - key="2": Banana
```

---

## 🧠 Concepts Learned

- The Virtual DOM is a lightweight JavaScript representation of the real DOM, enabling faster in-memory updates before reflecting them in the actual DOM.

- React still uses the Virtual DOM concept, but in a more evolved and optimized form called the Fiber architecture (post React 16).

- React Fiber is the modern reconciliation engine that supports asynchronous, interruptible, priority-based rendering and features like time-slicing and concurrency.

- Reconciliation is the process where React compares the current Fiber tree with the new one using a diffing algorithm to update only the necessary UI parts.

- The reconciliation process follows rules: same element type → update props; different type → replace subtree; keys improve list diffing.

- Keys are essential in list rendering for React to track elements efficiently and prevent unnecessary re-renders or incorrect DOM updates.

- createRoot() (introduced in React 18) initializes the Fiber root, enables concurrent features, sets up the work-in-progress and current trees, and replaces the older ReactDOM.render().

- The rendering process consists of two phases:

- Render Phase (async, can be paused) → builds Work-in-Progress tree + creates Effect List.

- Commit Phase (sync) → applies DOM changes and swaps trees.

- Effect Lists optimize DOM updates by storing only nodes that need to be changed.

---

## 🎓 Interview Questions

**Q1: What is Virtual DOM?**

**Q2: How does React update the UI efficiently?**

**Q3: What is the difference between Stack Reconciler and Fiber?**

**Q4: Why are keys important in lists?**

**Q5: What happens when you call setState?**

---

## Summary

1. Virtual DOM is now Fiber Trees (more sophisticated)

2. Fiber enables async rendering with priorities

3. Reconciliation = Comparing trees + minimal DOM updates

4. Keys are crucial for list performance

5. createRoot enables React 18 concurrent features
