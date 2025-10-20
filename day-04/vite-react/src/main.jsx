import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";

function MyReact() {
  return (
    <>
      <h2>Vite React App! </h2>
    </>
  );
}

const ReactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_parent",
  },
  children: "Click me to visit google",
};
/* 
  The above code or custom object (ReactElement) will not work or render automatically in vite react or any bundler because its a custom react code (plain JavaScript object) the one which we have written in 'cutomreact.js' file .

  And for that code we also wrote custom render method(customRender()) to convert such objects into real DOM. 
  
  But here since we are inside a real React environment, react uses its own rendering (createRoot()) logic that doesn't recognize custom object structures unless passed through React.createElement. and also React expects elements created via React.createElement() or JSX

*/

const anotherElement = (
  <a href="https://facebook.com" target="_blank">
    Visit Facebook
  </a>
);
/* 
  This works because JSX is transpiled (by the bundler) into a React.createElement() object structure. 
  So, React understands and processes it. 
*/

const newElement = React.createElement(
  "a",
  { href: "htttps://youtube.com", target: "_blank" },
  "Visit Youtube"
);
/* 
  Here React.createElement() you can pass any value in it and its expects a object but how it takes the value for that syntax are predefined by React we can't control it.

  React.createElement() syntax:
  1st param: HTML tag or component (string or function/class)
  2nd param: props object (attributes/properties)
  3rd+ params: children (can be multiple or nested)(text)
*/

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//     <MyReact />
//   </StrictMode>
// );

// createRoot(document.getElementById("root")).render(anotherElement);

createRoot(document.getElementById("root")).render(newElement);

/*
  VIRTUAL DOM TREE STRUCTURE:

   {
     type: 'a',
     props: {
       href: 'https://google.com',
       target: '_blank',
       children: 'Click me'
     },
     key: null,
     ref: null,
     $$typeof: Symbol(react.element) // React's internal marker
   }

   React uses this structure to:
   - Track component hierarchy
   - Perform efficient diffing
   - Batch DOM updates
   - Manage component lifecycle
*/

/*
  KEY CONCEPTS:
   
   1. Every React project uses a bundler (like Vite, Webpack, or Parcel).
   2. JSX is NOT JavaScript - it's syntactic sugar for React.createElement().
   3. The Bundlers (Babel/Vite/Webpack) converts/transpile JSX(which is not understood by JavaScript or React directly) into React.createElement() calls
   4. React.createElement() creates React element objects (Virtual DOM nodes)
   5. The Virtual DOM is a lightweight JavaScript representation of the actual DOM
   6. React's reconciliation algorithm compares Virtual DOM trees and efficiently updates only the changed parts of the real DOM (React then uses this virtual DOM to efficiently update the real DOM.)
 */
