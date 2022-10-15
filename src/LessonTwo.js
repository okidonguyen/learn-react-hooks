import { useState, useEffect } from "react";

function LessonTwo() {
  return (
    <div>
      <h1>useEffect() Hooks</h1>
      <p>This lesson lern about useEffect </p>
      <h2>Exmaple 1: get content from API</h2>
      <MenuTab />
      <h2>Exmaple 2: Go to Top</h2>
      <GotoTop />
      <h3>Example 3: Resize window</h3>
      <ResizeWindow />
    </div>
  );
}

const MenuTab = () => {
  const tabs = ["posts", "comments", "albums"];
  const [menu, setMenu] = useState("posts");
  const [content, setContent] = useState([]);
  const [divScroll, setDivScroll] = useState(null);
  const handleDivScrollTop = () => {
    if (divScroll !== null) {
      divScroll.target.scrollTop = 0;
    }
  };
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${menu}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data);
      });
  }, [menu]);

  return (
    <div>
      {/* Menu Tab */}
      {tabs.map((tab) => (
        <button
          style={menu === tab ? { color: "white", background: "black" } : {}}
          onClick={() => {
            setMenu(tab);
            handleDivScrollTop();
          }}
          key={tab}
        >
          {tab}
        </button>
      ))}
      {/* Get content from state to render */}
      <div
        style={{
          width: "500px",
          height: "200px",
          margin: "10px auto",
          textAlign: "left",
          overflow: "scroll",
        }}
        onScroll={(e) => {
          setDivScroll(e);
        }}
      >
        <ul>
          {content.map((con) => (
            <li key={con.id}>{con.title || con.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={() => {
            handleDivScrollTop();
          }}
        >
          {divScroll !== null ? divScroll.target.scrollTop : "0"} - Click Go to
          Top
        </button>
      </div>
    </div>
  );
};

const GotoTop = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    console.log("running effect");

    // Set Scroll High
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    // Add Event Listener
    window.addEventListener("scroll", handleScroll);

    // Clean when dismount
    return () => {
      // Remove Event Listener
      // window.removeEventListener("scroll", handleScroll);
      console.log("unmouting ...");
    };
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
      }}
    >
      {scroll >= 200 ? (
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Go to Top {scroll}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

const ResizeWindow = () => {
  const [windowSize, SetWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      SetWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <button
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
      }}
    >
      {windowSize.width + " - " + windowSize.height}
    </button>
  );
};

export default LessonTwo;
