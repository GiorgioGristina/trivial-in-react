
function Question(props) {  
  const answers = [props.answerCorrect, ...props.answersIncorrect];
  

  const shuffleArray = array => {
    // const ans = []
      for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      return array
    }
    // return ans    
  }
  
  
  const s = shuffleArray(answers)
  // console.log(props.answerCorrect, s)
  
  // const s = shuffleArray(props.answerCorrect)
  // const answers =  shuffleAnswer(props.answersIncorrect, props.answerCorrect)
  // console.log(answers)
  return (
    <div> 
      <h3>{props.question}</h3>
      <ul>
        <li onClick={props.click}>{s[0]}</li>
        <li onClick={props.click}>{s[1]}</li>
        <li onClick={props.click}>{s[2]}</li>
        <li onClick={props.click}>{s[3]}</li>

      </ul>
    </div>
  );
}

export default Question;
