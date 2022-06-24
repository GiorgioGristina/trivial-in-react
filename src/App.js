import Button from './components/Button';
import Question from './components/Question';

import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [started, setStarted] = useState(false)
  const [data, setData] = useState([])
  const [ question, setQuestions] = useState([])
  // const [isContainerActive, setIsContainerActive] = useState(false);
  // const answerShuf = []
  useEffect(() => {
    if (started) {
      fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => setData(data.results))     
    }
  }, [started])

  useEffect(() => {
    function generateAnswer(data){
      const correct = data.correct_answer
      let incorrect = data.incorrect_answers
      const randomNum = Math.floor(Math.random() * 4);
      const newArray = [...incorrect]
      newArray.splice(randomNum, 0, correct)
      return newArray;   
    }
    function generateAnswerObj(data){
      const answerOption = generateAnswer(data)
      answerOption.map((answer, i) => {
        return {
          id: i,
          answer: answer,
          selected: false
        }
      })
      return data
    }
    const generateQuestionOBject = (object) => {
      return {
        question: object.question,
        correctAnswer: object.correct_answer,
        answers: generateAnswerObj(object)
      }
    }
    setQuestions( data.map((item) => generateQuestionOBject(item)))
  }, [data])
  
  console.log(question);
  // console.log(data);
  // data.map((obj => {
  //   generateAnswer(obj)

  // }))



  // console.log(question);

  function handleClick(e){
    // // console.log()
    // // e.target.className("active")
    // console.log(e.currentTarget);
    // setIsContainerActive(prev => !prev)
  }
 
  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  // const questionElements = questionAnswer.map((question, index) => {
  //   return <Question click={handleClick}
  //                    key={index}
  //                    activeContainer={isContainerActive}
  //                    question={question.question} 
  //                    answers={question.option} 
  //                     />
  // })

  return (
    <section className='container'>
      { !started && <Button start={startGame}  className="start-button"/>}
      {/* {started && questionElements} */}
    </section>
  );
}

export default App;
