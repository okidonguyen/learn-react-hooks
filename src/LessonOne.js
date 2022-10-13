import { useState } from "react";
import { v4 } from "uuid";

function LessonOne() {
  return (
    <div>
      <h1>useState() Hooks</h1>
      <p>This lesson learn about how to use useState</p>
      <p>Example 1: Click to inscrease number</p>
      <InscreaseNumber />
      <p>Example 2: Todo App</p>
      <TodoApp />
    </div>
  );
}

function InscreaseNumber() {
  // useState with declare
  const [num, setNum] = useState(0);
  return (
    <div>
      <h1>My number is: {num}</h1>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}

function TodoApp() {
  const data = [
    {
      id: 1,
      title: "useState",
      completed: false,
    },
    {
      id: 2,
      title: "useEffect",
      completed: false,
    },
    {
      id: 3,
      title: "useMemo",
      completed: false,
    },
  ];

  const [list, setList] = useState(data);
  const [text, setText] = useState("");

  // Get Text and update List
  const handleInput = (inputText) => {
    const newData = {
      id: v4(),
      title: inputText,
      completed: false,
    };
    setList([...list, newData]);
  };

  // Get ID checkbox and update List
  const handleCheckbox = (id) => {
    const newList = list.map((item) =>
      item.id === id ? (item.completed = !item.completed) : ""
    );
    setList(newList);
  };

  // Get ID to delete and update List
  const handleDel = (id) => {
    const delList = list.filter((item) => item.id !== id);
    setList(delList);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          // Prevent Submit form
          e.preventDefault();
          handleInput(text);
          setText("");
        }}
      >
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
          placeholder="Enter text"
          value={text}
        />
      </form>
      <ul style={{ listStyleType: "none" }}>
        {list.map((item) => (
          <li key={item.id}>
            <input
              type={"checkbox"}
              checked={item.completed}
              onChange={(e) => {
                handleCheckbox(item.id);
              }}
            />
            {item.title} -{" "}
            <button
              onClick={() => {
                handleDel(item.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonOne;
