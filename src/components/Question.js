import "./Question.css"

function Question({questionId, question, answers, click, selctedAnswer, index}) {  
    const selected = (answer) => {
      return answer.selected ? "active" : ""
    }
    
    
    const highlightCorrectAnswer = (answer) => {
      if (selctedAnswer.length === 5) {
        // console.log('RUNNING');
       return answer.answer === selctedAnswer[index].rightAns && selctedAnswer[index].showCorrect ? "correct": ""
      }

    }
   
    const answerElements = answers.map((answer, i) => {
    return <p key={answer.id}  id={answer.id} 
               className={`${selected(answer)} ${highlightCorrectAnswer(answer)} answer`} 
               onClick={click}>
                  {answer.answer}
            </p>
  })

  return (
    <div className="question-container"> 
      <h3 className="question">{question}</h3>
      <div className="list-container">
        {answerElements}
      </div>
    </div>
  );
}

export default Question;
