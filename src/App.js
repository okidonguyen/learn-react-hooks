import "./App.css";
import LessonOne from "./LessonOne";
import LessonTwo from "./LessonTwo";
import { useState } from "react";

function App() {
  const lessons = ["useState", "useEffect", "useRef"];
  const [tab, setTab] = useState("useState");

  return (
    <div className="App">
      {lessons.map((les) => (
        <button
          key={les}
          style={les === tab ? { color: "white", background: "black" } : {}}
          onClick={() => {
            setTab(les);
          }}
        >
          {les}
        </button>
      ))}
      {tab === "useState" ? <LessonOne /> : ""}
      {tab === "useEffect" ? <LessonTwo /> : ""}
    </div>
  );
}

export default App;
