import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">BG Changer</h1>

      <div
        className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        <div className="fixed flex flex-wrap top-16 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg px-3 py-2 bg-amber-50 rounded-2xl">
            <button
              className="outline-none px-3 py-1 rounded-full text-white shadow-sm"
              style={{ backgroundColor: "#9C2007" }}
              onClick={() => setColor("#9C2007")}
            >
              Red
            </button>
            <button
              className="outline-none px-3 py-1 rounded-full text-white shadown-sm"
              style={{ backgroundColor: "#057034" }}
              onClick={() => setColor("#057034")}
            >
              Green
            </button>
            <button
              className="outline-none text-white px-3 py-1 rounded-full shadow-sm"
              style={{ backgroundColor: "#3127F5" }}
              onClick={() => setColor("#3127F5")}
            >
              Blue
            </button>
            <button
              className="text-white px-3 py-1 rounded-full outline-none shadow-sm"
              style={{ backgroundColor: "#787D33" }}
              onClick={() => setColor("#787D33")}
            >
              Olive
            </button>
            <button
              style={{ backgroundColor: "#919689" }}
              className="text-white px-3 py-1 rounded-full shadow-sm"
              onClick={() => setColor("#919689")}
            >
              Grey
            </button>
            <button
              style={{ backgroundColor: "#F6EB61" }}
              className="text-black px-3 py-1 rounded-full shadow-sm outline-none"
              onClick={() => setColor("#F6EB61")}
            >
              Yellow
            </button>
            <button
              style={{ backgroundColor: "#F2ACB9" }}
              className="text-black px-3 py-1 rounded-full shadow-sm outline-none"
              onClick={() => setColor("#F2ACB9")}
            >
              Pink
            </button>
            <button
              style={{ backgroundColor: "#68478D" }}
              className="text-white px-3 py-1 rounded-full shadow-sm outline-none"
              onClick={() => setColor("#68478D")}
            >
              Purple
            </button>
            <button
              style={{ backgroundColor: "#9873AC" }}
              className="text-black px-3 py-1 rounded-full shadow-sm outline-none"
              onClick={() => setColor("#9873AC")}
            >
              Lavender
            </button>
            <button
              style={{ backgroundColor: "#ffffff" }}
              className="text-black px-3 py-1 rounded-full shadow-sm outline-none"
              onClick={() => setColor("#ffffff")}
            >
              White
            </button>
            <button
              style={{ backgroundColor: "#000000" }}
              className="text-white px-3 py-1 rounded-full shadow-sm outline-none"
              onClick={() => setColor("#000000")}
            >
              Black
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
