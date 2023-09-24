import { useState, useEffect } from "react";
import BackGround from "./Components/BackGround";
import "./App.css";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark-mode");

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <div className={`main`}>
      <BackGround mode={mode} setMode={setMode}></BackGround>
    </div>
  );
}

export default App;
