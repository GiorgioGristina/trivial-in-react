import Button from './components/Button';
import Question from './components/Question';

import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [started, setStarted] = useState(false)
  const [questionAnswer, setQuestionAnswer] = useState([])

  
  // const answerShuf = []
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuestionAnswer(data.results))
    
  }, [])

  function handleClick(e){
    console.log(e.target.innerText)
  }
 
  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  const questionElements = questionAnswer.map((question) => {
    return <Question click={handleClick}
                     question={question.question} 
                     answerCorrect={question.correct_answer} 
                     answersIncorrect={question.incorrect_answers} />
  })

  return (
    <section className='container'>
      { !started && <Button start={startGame}  className="start-button"/>}
      {started && questionElements}
    </section>
  );
}

export default App;
