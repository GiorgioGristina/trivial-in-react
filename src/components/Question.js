import "./Question.css"

function Question({questionId, question, answers, click}) {  

  const answerElements = answers.map((answer) => {
    return <li  id={answer.id} className={ answer.selected ? "active" : "" } onClick={click}>{answer.answer}</li>
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
