import "./App.css";
import LessonOne from "./LessonOne";
import LessonTwo from "./LessonTwo";
import GameShow from "./GameShow";
import { useState } from "react";

function App() {
  const lessons = ["useState", "useEffect", "useRef", "GameShow"];
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
      {tab === "GameShow" ? <GameShow /> : ""}
    </div>
  );
}

const GameShowApp = () => {
  return (
    <div
      style={{
        backgroundImage: "url(./rose.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <GameShow />
      <button
        onClick={() => {
          localStorage.clear();
          window.location = "/";
        }}
      >
        CLEAR
      </button>
    </div>
  );
};

export default GameShowApp;
