import { useState, useEffect } from "react";
import { questiondata } from "./data";

const GameShow = () => {
  const data = questiondata;
  const [listQuestion, setListQuestion] = useState(() => {
    const localListQuestion = JSON.parse(localStorage.getItem("listQuestion"));
    if (localListQuestion == null) {
      return data;
    } else {
      return localListQuestion;
    }
  });

  // User Effect: chooseQuestion
  useEffect(() => {
    localStorage.setItem("listQuestion", JSON.stringify(listQuestion));
  }, [listQuestion]);

  // 1 - Choose Question
  const [chooseQuestion, setChooseQuestion] = useState(() => {
    const localQuestion = JSON.parse(localStorage.getItem("chooseQuestion"));
    return localQuestion;
  });

  // User Effect: chooseQuestion
  useEffect(() => {
    localStorage.setItem("chooseQuestion", JSON.stringify(chooseQuestion));
  }, [chooseQuestion]);

  const [luckList, setLuckList] = useState(() => {
    const localLuckList = JSON.parse(localStorage.getItem("luckList"));
    if (localLuckList === null) {
      return [];
    } else {
      return localLuckList;
    }
  });

  useEffect(() => {
    localStorage.setItem("luckList", JSON.stringify(luckList));
  }, [luckList]);

  const handleChoose = (id, status) => {
    if (status === 1) {
      const question = listQuestion.find((ques) => ques.id === id);
      setChooseQuestion(question);
    }
  };

  const handleLuckyChoose = (id, type) => {
    const newList = listQuestion.map((ques) => {
      if (ques.id === id && type === "lucky") {
        ques.status = 3;
        setLuckList([...luckList, id]);
      }

      if (ques.id === id && type === "unlucky") {
        ques.status = 2;
      }
      return ques;
    });

    setListQuestion(newList);
    setChooseQuestion(null);
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "25pt",
          fontWeight: "800",
          textShadow: "3px 3px 3px white",
          color: "red",
          padding: "15px",
        }}
      >
        KHO BẠC NHÀ NƯỚC
        {<br />}
        KHO BẠC NHÀ NƯỚC ĐẮK LẮK
      </div>
      <div
        style={{
          fontSize: "35pt",
          fontWeight: "800",
          textShadow: "3px 3px 3px white",
          color: "green",
          padding: "10px",
        }}
      >
        HỘI THI HÁI HOA DÂN CHỦ
      </div>

      <div
        style={{
          width: "1200px",
          textAlign: "center",
          padding: "20px",
          margin: "0 auto",
          backgroundColor: "rgb(149 132 151 / 50%)",
        }}
      >
        {chooseQuestion === null ? (
          <div>
            <ListQuestion data={listQuestion} handleChoose={handleChoose} />
            <button
              style={{
                color: "green",
                padding: "10px",
                margin: "10px",
                width: "200px",
                height: "80px",
                fontSize: "26pt",
                fontWeight: "600",
              }}
            >
              Chọn số
            </button>
            <div
              style={{
                fontSize: "35pt",
                fontWeight: "500",
                textShadow: "3px 3px 3px white",
                color: "yellow",
              }}
            >
              {/* Số dự thưởng: {luckList.map((num) => num + " . ")} */}
            </div>
          </div>
        ) : (
          <Question
            data={chooseQuestion}
            handleLuckyChoose={handleLuckyChoose}
          />
        )}
      </div>
    </div>
  );
};

const ListQuestion = (props) => {
  // STYLE
  const backgroundDiv = {
    float: "left",
    width: "80px",
    height: "80px",
    textAlign: "center",
    backgroundSize: "contain",
    backgroundImage: "url(./rose_png.png)",
    backgroundRepeat: "no-repeat",
    padding: "10px",
    margin: "10px",
    backgroundColor: "#f574bb",
    // backgroundColor: hover ? "#fba7d5" : "#f574bb"
  };

  const textDiv = {
    position: "relative",
    top: "10%",
    fontSize: "25pt",
    fontWeight: "500",
    textShadow: "3px 3px pink",
    color: "white",
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = "yellow";
    e.currentTarget.style.cursor = "pointer";
  };

  const handleMouseout = (e) => {
    e.currentTarget.style.backgroundColor = "#f574bb";
    e.currentTarget.style.cursor = "auto";
  };

  return (
    <div>
      {props.data.map((question) => (
        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseout}
          onClick={() => {
            props.handleChoose(question.id, question.status);
          }}
          style={
            question.status === 1
              ? backgroundDiv
              : { ...backgroundDiv, filter: "grayscale(80%)" }
          }
          key={question.id}
        >
          <div style={textDiv}>{question.id}</div>
        </div>
      ))}
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

const Question = (props) => {
  const buttonStyle = {
    padding: "10px",
    margin: "10px",
    width: "200px",
    height: "80px",
    fontSize: "16pt",
    fontWeight: "600",
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "400px",
        color: "white",
        margin: "0px auto",
        padding: "20px",
        backgroundImage: "url(./flower2.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 80%",
        backgroundPosition: "2% 80%",
        textShadow: "3px 3px 3px black",
      }}
    >
      <h1>Câu hỏi: {props.data.id}</h1>
      <div
        style={{
          fontSize: "25pt",
          width: "850px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {props.data.question}
      </div>
      <br />
      <br />
      <button
        onClick={() => {
          props.handleLuckyChoose(props.data.id, "lucky");
        }}
        style={{
          ...buttonStyle,
          color: "green",
        }}
      >
        Tặng phiếu dự thưởng
      </button>
      <button
        onClick={() => {
          props.handleLuckyChoose(props.data.id, "unlucky");
        }}
        style={{
          ...buttonStyle,
          color: "red",
        }}
      >
        Không tặng phiếu dự thưởng
      </button>
    </div>
  );
};

export default GameShow;
