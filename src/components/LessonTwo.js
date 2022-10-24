import { useState, useEffect } from "react";

function LessonTwo() {
  return (
    <div>
      <h1>useEffect() Hooks</h1>
      <p>This lesson lern about useEffect </p>
      <h1>Exmaple 1: get content from API</h1>
      <MenuTab />
      <hr />
      <h1>Exmaple 2: Go to Top</h1>
      <GotoTop />
      <hr />
      <h1>Example 3: Resize window</h1>
      <ResizeWindow />
      <hr />
      <h1>Example 4: Countdown</h1>
      <CountdownTimer />
      <hr />
      <h1>Example 5: Upload IMG</h1>
      <UploadImg />
      <hr />
      <h1>Example 6: Custom Window Event Emmit</h1>
      <MyCustomEvent />
      <hr />
      <br />
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

// Go to Top Button
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

// Add Event Listener and clear when remove Component
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

// Timer countdown
const CountdownTimer = () => {
  const [myTimer, setMyTimer] = useState(20);
  const [start, setStart] = useState(false);

  useEffect(() => {
    // Declare Interval to run per second
    const timer = setInterval(() => {
      if (start) {
        // use callback because inside Interval cannot change value outside
        setMyTimer((preState) => {
          if (preState === 0) {
            //  stop when state = 0
            clearInterval(timer);
            setStart(false);
          } else {
            // subtract 1
            preState = preState - 1;
          }
          return preState;
        });
      } else {
        // pause, clear timer
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      // clear timer when unmounting
      clearInterval(timer);
    };
  }, [start]);

  // render
  return (
    <div>
      <h3>Countdown: {myTimer}</h3>
      <button
        onClick={() => {
          setStart(!start);
        }}
      >
        {start ? "resume" : "start"}
      </button>
      <button
        onClick={() => {
          setMyTimer(20);
          setStart(false);
        }}
      >
        reset
      </button>
    </div>
  );
};

// Upload Image Avatar
const UploadImg = () => {
  const [avatar, setAvatar] = useState();
  const handleUpload = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    // Clear to choose one file multiple
    e.target.value = null;
  };

  // Clear when choose other avatar
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {avatar && <img src={avatar} alt={avatar.name} />}
    </div>
  );
};

const MyCustomEvent = () => {
  const lessons = [
    {
      id: 1,
      title: "Lesson 1",
    },
    {
      id: 2,
      title: "Lesson 2",
    },
    {
      id: 3,
      title: "Lesson 3",
    },
  ];
  const [active, setActive] = useState(1);
  return (
    <div>
      <ul>
        {lessons.map((les) => (
          <li
            key={les.id}
            style={
              active === les.id
                ? {
                    color: "orange",
                    fontWeight: "500",
                  }
                : {}
            }
            onClick={() => {
              setActive(les.id);
            }}
          >
            {les.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonTwo;
