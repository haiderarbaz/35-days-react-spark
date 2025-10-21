import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  let increaseValue = () => {
    setCounter((counter) => {
      if (counter >= 30) {
        return 0;
      }
      return counter + 1;
    });
  };

  let decreaseValue = () => {
    setCounter((counter) => {
      if (counter <= 0) {
        return 0;
      }
      return counter - 1;
    });
  };

  let resetValue = () => {
    setCounter(0);
  };

  return (
    <>
      <h1>Counter App</h1>
      <h3>Count is {counter}</h3>

      <div className="buttons">
        <button onClick={increaseValue} disabled={counter >= 30}>
          Increase
        </button>
        <button onClick={decreaseValue} disabled={counter <= 0}>
          Decrease
        </button>
        <button onClick={resetValue}>Reset</button>
      </div>
    </>
  );
}

export default App;
