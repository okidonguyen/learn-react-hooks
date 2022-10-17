import { useState } from "react";
const GameShow = () => {

    // Status: 1-ready 2-playing 3-luckyticket 4-unready
    const questionsList = [
        {
            id: 1,
            question: "Cứ nhẹ nhàng, bình tĩnh và kiên nhẫn trẻ sẽ cảm thấy tin tưởng từ đó đặt nhiều câu hỏi hơn và tâm sự nhiều hơn với cha mẹ trong tương lai thay vì tìm câu trả lời từ những nguồn không đáng tin tưởng.Cha mẹ khi giao tiếp hay khi làm việc đều rất không thích người khác nói chuyện theo kiểu lên mặt giáo huấn hoặc chế nhạo mình thì trẻ con cũng vậy. Việc nói chuyện giáo huấn sẽ tạo cho con một áp lực vô hình và dần chúng sẽ sợ giao tiếp với cha mẹ và người khác. Cứ nhẹ nhàng, bình tĩnh và kiên nhẫn trẻ sẽ cảm thấy tin tưởng từ đó đặt nhiều câu hỏi hơn và tâm sự nhiều hơn với cha mẹ trong tương lai thay vì tìm câu trả lời từ những nguồn không đáng tin tưởng.",
            status: 1
        },
        {
            id: 2,
            question: "Question 1",
            status: 1
        },
        {
            id: 3,
            question: "Question 1",
            status: 1
        },
        {
            id: 4,
            question: "Question 1",
            status: 1
        }
        ,
        {
            id: 5,
            question: "Question 1",
            status: 1
        }
        ,
        {
            id: 6,
            question: "Question 1",
            status: 1
        }
    ]

    const luckList = []

    // Route Game show
    // 1 - Choose
    const [ques, setQuest] = useState(null)

    const handleChoose = (id) => {
        const question = questionsList.find(ques => (ques.id === id))
        setQuest(question);
    }

    const handleLuckyChoose = (id, type) =>{
        if(type === "lucky"){
            luckList.push(id);            
        }
    }

    return (
        <div>
            <h1>Picking Flowers - Vietnamese Woman Day</h1>
            {ques === null? <QuestionsList data={questionsList} handleChoose={handleChoose}/> : <Question data={ques}/>}
        </div>
    )
}

const QuestionsList = (props) => {
    

    // STYLE
    const backgroundDiv = {
        float: "left",
        width: "100px",
        height: "100px",
        textAlign: "center",
        backgroundSize: "contain",
        backgroundImage: "url(./flowers.png)",
        backgroundRepeat: 'no-repeat',
        padding: "10px",
        margin: "10px",
        backgroundColor:"#f574bb"
        // backgroundColor: hover ? "#fba7d5" : "#f574bb"
    }

    const textDiv = {
        position: "relative",
        top: "10%",
        fontSize: "35pt",
        fontWeight: "500",
        textShadow: "3px 3px pink",
        color: "white"
    }

    const handleMouseOver = (e) =>{
        e.currentTarget.style.backgroundColor = 'yellow';
        e.currentTarget.style.cursor = 'pointer';
    }

    const handleMouseout = (e) =>{
        e.currentTarget.style.backgroundColor = '#f574bb';
        e.currentTarget.style.cursor = 'auto';
    }

    return (
        <div>
            {props.data.map(question => (
                <div 
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseout}
                    onClick={()=>{props.handleChoose(question.id)}}
                    style={backgroundDiv} key={question.id}>
                    <div
                        style={textDiv}                        
                    >
                        {question.id}
                    </div>
                </div>
            ))}
            <div style={{ clear: "both" }}></div>
        </div>
    )
}

const Question = (props) =>{

    const buttonStyle = {
        padding:"10px",
        margin:"10px",
        width: "200px",
        height: "80px",
        fontSize: "16pt"
    }   

    return(
        <div style={{
            position:"relative",
            width:"100%",
            minHeight:"400px",
            backgroundColor:"#f574bb",
            color: "white",
            margin:"0px auto",
            padding: "20px",
            backgroundImage:"url(./flower2.png)",
            backgroundRepeat: 'no-repeat',
            backgroundSize: "auto 80%",
            backgroundPosition:"2% 80%"
        }}>
            <h1>Câu hỏi: {props.data.id}</h1>
            <div
                style={{fontSize:"18pt", width:"700px", margin:"0 auto", textAlign:"justify"}}
            >{props.data.question}</div>
            <button style={{
                ...buttonStyle,
                color:"green"
            }}>Tặng phiếu dự thưởng</button>
            <button style={{
                ...buttonStyle,
                color:"red"
            }}>Không tặng phiếu dự thưởng</button>
        </div>
    )
}


export default GameShow;