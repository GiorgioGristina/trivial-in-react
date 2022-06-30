import "./Question.css"

function Question({questionId, question, answers, click, selctedAnswer, index}) {  
    const selected = (answer) => {
      return answer.selected ? "active" : ""
    }
    
    
    const highlightCorrectAnswer = (answer) => {
      if (selctedAnswer.length === 5) {
        console.log('RUNNING');
       return answer.id === selctedAnswer[index].answerId && selctedAnswer[index].showCorrect ? "correct": ""
      }

    }
   
    const answerElements = answers.map((answer, i) => {
    return <li key={answer.id}  id={answer.id} 
               className={`${selected(answer)} ${highlightCorrectAnswer(answer)}`} 
               onClick={click}>
                  {answer.answer}
            </li>
  })

  return (
    <div> 
      <h3 >{question}</h3>
      <ul>
        {answerElements}
      </ul>
    </div>
  );
}

export default Question;
