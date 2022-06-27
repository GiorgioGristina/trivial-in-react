import "./Question.css"

function Question({questionId, question, answers, click}) {  
//  set the state of the select answer in question component
// so every single instance of component have their own state
  // console.log(answers[0].id);
  

  return (
    <div> 
      <h3 >{question}</h3>
      <ul>
        <li  id={answers[0].id} className={ answers[0].selected ? "active" : "" } onClick={click}>{answers[0].answer}</li>          
        <li  id={answers[1].id} className={ answers[1].selected ? "active" : "" } onClick={click}>{answers[1].answer}</li>
        <li  id={answers[2].id} className={ answers[2].selected ? "active" : "" } onClick={click}>{answers[2].answer}</li>
        <li  id={answers[3].id} className={ answers[3].selected ? "active" : "" } onClick={click}>{answers[3].answer}</li>
      </ul>
    </div>
  );
}

export default Question;
