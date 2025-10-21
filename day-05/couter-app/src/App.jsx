import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  // let counter = 10;
  const increaseValue = () => {
    // counter = counter + 1;
    setCounter((counter) => {
      if (counter >= 30) {
        return (counter = 0);

        // OR
        // return 0;
      }
      return counter + 1;
    });
    console.log("Increase Clicked", counter); // Note: This will log the OLD value due to async state updates
  };

  const decraseValue = () => {
    // counter = counter - 1;
    setCounter((counter) => {
      if (counter <= 0) {
        return (counter = 0);

        // OR
        // return 0;
      }
      return counter - 1;
    });
    console.log("Decrease Clicked", counter); // Note: This will log the OLD value due to async state updates
  };

  const resetValue = () => {
    setCounter(0);
    console.log("Counter Reset!");
  };
  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter App</h2>

      <p>Counter Value: {counter}</p>

      <div className="buttons">
        <button onClick={increaseValue}>Increase Value: {counter}</button>

        <button onClick={decraseValue}>Decrease Value: {counter}</button>

        <button onClick={resetValue}>Reset Value: {counter}</button>
      </div>
    </>
  );
}

export default App;
