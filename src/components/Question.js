
function Question({question, answers, click}) {  
 
  console.log(answers[0].id);
  return (
    <div> 
      <h3>{question}</h3>
      <ul>
        <li  onClick={click}>{answers[0].answer}</li>          
        <li  onClick={click}>{answers[1].answer}</li>
        <li  onClick={click}>{answers[2].answer}</li>
        <li  onClick={click}>{answers[3].answer}</li>
      </ul>
    </div>
  );
}

export default Question;
