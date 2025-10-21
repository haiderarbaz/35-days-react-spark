# Day-05 of 35-Days-React-Spark

**Date:** 21/10/2025

**Topic:** Why You Need Hooks and Counter Project

**Resource:** ChaiCode YouTube Channel – Video 5

---

## 🔑 Key Takeaways (From Video 5)

1. **Introduction to React Hooks**

   - Got an overview of what hooks are and their purpose

   - Understood why React introduced hooks (simpler state management in functional components)

2. **Why We Need Hooks**

   - Learned that React needs a special way to track changes that should update the UI

   - Discovered that regular JavaScript variables don't trigger UI re-renders

   - Understood React's UI control mechanism and re-rendering process

3. **Built First Project: Counter App**

   - Created a simple counter application

   - Implemented increment/decrement functionality

   - Experimented with different approaches

4. **useState Hook Implementation**

   - Learned the syntax: `const [count, setCount] = useState(0)`

   - Understood how state variables differ from regular variables

   - Saw how calling `setCount()` triggers UI re-renders

5. **Key Experiment: With vs Without Hooks**

   - Tried updating UI with regular JavaScript variables (failed)

   - Discovered that normal variables update in memory but don't reflect on UI

   - Realized hooks are React's way of making UI reactive to data changes

6. **React's UI Update Propagation**

   - Understood how a single state variable update propagates changes across UI

   - Learned that React re-renders only the components affected by state changes

   - Saw the Virtual DOM in action (though not explained in detail yet)

---

## 🧠 Concepts Learned

**React doesn't automatically watch all variables. Only state variables (created with hooks like useState) trigger UI updates when changed.**

```javascript
// ❌ Doesn't update UI
let counter = 0;
counter++;

// ✅ Updates UI
const [counter, setCounter] = useState(0);
setCounter(counter + 1);
```

---

### 🎯 Key Interview Question

**Qusetion: Why doesn't the UI update when I change a regular variable in React?**

**Answer:** React doesn't track regular JavaScript variables. Only state variables (created using hooks like useState) are monitored by React. When you call the state setter function, React knows to re-render the component with the new value.

---

## 💡 Summary

React hooks allow functional components to manage state and trigger UI updates. Without hooks like useState, React cannot detect changes and re-render the UI.
