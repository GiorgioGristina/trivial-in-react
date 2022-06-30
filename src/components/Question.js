import "./Question.css"

function Question({questionId, question, answers, click, selctedAnswer, index}) {  
  const className = (answer) => {
    if (answer.selected) {
      return "active"
    } else if (!answer.selected && answer.correct) {
      return "correct"
    } else {
      return ""
    }
  }
    const selected = (answer) =>{
      return answer.selected ? "active" : ""
    }
    
    const hightlightTheCorrectOneIfSelectTheWrongOne = (answer, i) => {
      // console.log(selctedAnswer);
      if (selctedAnswer.length === 5 ) {
        //   console.log(answer.id, selctedAnswer[0]);
        //   // if (answer.id === selctedAnswer[i].answerId) {
          //   //   return "correct"
          //   // }
          // }
          // if (selctedAnswer.length !== 0 ) {
          //   console.log(index );
          //   if (selctedAnswer[index].answerId === answer.id) {
          //     console.log("is the same");
          //     if (selctedAnswer[index].showCorrect) {
          //       return "correct"
                
          //     }
              
          //   } else{
          //     console.log("is not the same...");
          //     return ""
          //   }
          console.log(answer.answer === selctedAnswer[i].answer);
            if (answer.answer === selctedAnswer[i].answer && selctedAnswer[i].showCorrect ) {
              return "correct"
            }
          }
    }

    
    function highlightCorrectAnswer(answer){
      if (selctedAnswer.length === 5) {
        console.log('RUNNING');
       return answer.id === selctedAnswer[index].answerId && selctedAnswer[index].showCorrect ? "correct": ""
      }

    }
    // console.log(selctedAnswer);
    // ,hightlightTheCorrectOneIfSelectTheWrongOne(answer, index)
    console.log(selctedAnswer);
    const answerElements = answers.map((answer, i) => {

    return <li key={answer.id}  id={answer.id} className={`${selected(answer)} ${highlightCorrectAnswer(answer)}`} onClick={click}>{answer.answer}</li>
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
