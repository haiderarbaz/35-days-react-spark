// import { useState } from "react";
import Card from "./components/Card";

function App() {
  // const newObj = {
  //   topicName: "tailwindCss, props",
  //   dayNo: 7,
  // };

  // const newArr = [1, 2, 3];
  return (
    <>
      <h1
        className="text-3xl bg-yellow-400 text-center
      text-black p-4 rounded-xl font-bold underline mb-4"
      >
        Hello world!
      </h1>
      <Card price="$18" btnText="Buy now" />
      <Card price="$19" />
    </>
  );
}

export default App;
