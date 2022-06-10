import Button from './components/Button';
import Question from './components/Question';

import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [started, setStarted] = useState(false)
  const [questionAnswer, setQuestionAnswer] = useState([])
  
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuestionAnswer(data.results))
    
  }, [])
  // console.log(questionAnswer);



  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  const questionElements = questionAnswer.map((question) => {
    <Question question={question.question} answers={[...question.correct_answer, ...question.incorrect_answers]} />
  })

  function shuffleAnswer(correct, incorrect){
    // console.log(correct, incorrect);
    let answer = [correct, ...incorrect];
    console.log(answer);

    // return answer
  }

  // console.log(shuffleAnswer(questionAnswer[0].correct_answer, questionAnswer[0].incorrect_answers))
  console.log(questionAnswer.correct_answer)

  return (
    <section className='container'>
      { !started && <Button start={startGame}  className="start-button"/>}
      {started && <Question />}
    </section>
  );
}

export default App;
