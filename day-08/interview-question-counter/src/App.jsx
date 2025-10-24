import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  let incrementValue = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  };

  let decrementValue = () => {
    setCount((prevCount) => prevCount - 1);
    setCount((prevCount) => prevCount - 1);
    setCount((prevCount) => prevCount - 1);
    setCount((prevCount) => prevCount - 1);
    setCount((prevCount) => prevCount - 1);
    // setCount(count - 1);
    // setCount(count - 1);
    // setCount(count - 1);
    // setCount(count - 1);
    // setCount(count - 1);
    // setCount((count) => count - 1);
    // setCount((count) => count - 1);
    // setCount((count) => count - 1);
    // setCount((count) => count - 1);
    // setCount((count) => count - 1);
  };

  let resetValue = () => {
    setCount(0);
  };

  return (
    <>
      <h1>Interview Question On Counter</h1>
      <h2>Counter: {count}</h2>
      <div className="buttons">
        <button onClick={incrementValue} disabled={count >= 30}>
          Increase
        </button>
        <button onClick={decrementValue} disabled={count <= 0}>
          Decrease
        </button>
        <button onClick={resetValue}>Reset</button>
      </div>
    </>
  );
}

export default App;
