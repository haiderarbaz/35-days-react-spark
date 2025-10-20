# Day-04 of 35-Days-React-Spark

**Date:** 20/10/2025

**Topic:** Cretae your own react library and JSX

**Resource:** ChaiCode YouTube Channel – Video 4

---

## 🔑 Key Takeaways (From Video 4)

- Created a mini custom React app setup to understand how React internally handles rendering.

- Understood how React elements get created by creating custom elements in two approaches

  1. Hardcoded

  2. Modular

- Wrote some method/function in Vite React in the `main.JSX` file to understand component execution and got to know that `App.js` is also a method that returns JSX, and understand how those methods are directly executed, and what to avoid while executing the method (directly invoking components like regular functions inside render (e.g., App() instead of `<App />`))

- Understood that JSX is not directly understood by React, it is convert/transpiled into `React.createElement()` by bundlers like Vite using Babel.

- Understand that at the end of the day, React converts elements into a tree structure or object and injects it.

- Observed that React elements are simply JavaScript objects representing UI (tree-like structure / Virtual DOM).

- Learned that `App` in `App.jsx` is a component (function), and React automatically invokes such components during rendering via `createRoot(...).render(<App />)`.

- Created some custom elements/objects(`ReactElement`), but that doesn't work and failed to render, then got to know about React.createElement() and React expects a specific object structure created by React.createElement(), that creates an element and injects it by default through Babel

- Custom-created elements (plain objects) don't render automatically in React, they work only with our custom renderer or via `React.createElement()`.

- React has its own rendering mechanism that doesn't recognize arbitrary objects

- Discovered why custom element objects don't work:

  - React expects specific object format from `React.createElement()`

  - Babel automatically converts/transpiles JSX into React.createElement()

  - Bundlers parse and optimize the code before execution

- Understand `React.createElement()`

  ```javascript
  React.createElement(
    "tag", // 1st param: HTML tag or component
    { props }, // 2nd param: attributes/properties object
    "children" // 3rd+ params: children (text or nested elements)
  );
  ```

## 🧠 Concepts Learned

- JSX is a special syntax that looks like HTML but gets converted into JavaScript.

- React elements are just JavaScript objects that describe the UI.

- Virtual DOM is a tree of these React elements that React uses before updating the real DOM.

- Components are functions that return JSX.

- React.createElement is the function that creates valid React elements internally.

- Babel automatically converts JSX into React.createElement() calls.

- Vite (bundler) helps process, optimize, and bundle the code so React can run it.

- Custom renderers are manual functions (like the one we built) that convert objects to actual DOM elements.

## 💡 Summary

- React elements are just JavaScript objects created via React.createElement() or JSX (transpiled by Babel).

- Custom object structures won’t render unless converted properly using React’s expected internal format.
