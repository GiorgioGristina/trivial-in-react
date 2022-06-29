import Button from './components/Button';
import Question from './components/Question';
import { nanoid } from 'nanoid'
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [started, setStarted] = useState(false)
  const [data, setData] = useState([])
  const [ questions, setQuestions] = useState([])
  const [ selectedAnswer, setSelectedAnswer] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [counterCorrectAnswer, setCounterCorrectAnswer] = useState(0)
  const [buttonClicked, setButtonClicked] = useState(false)
  
  useEffect(() => {
    if (started) {
      setLoading(true)
      fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => setData(data.results)) 
      .catch(error => setError(error) )
      .finally(() => setLoading(false))  
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
      let answerOption = [...generateAnswer(data)]
      // console.log(answerOption);
  
      const arrayObj = answerOption.map((answer, i) => {
        return {
          id: nanoid(),
          answer: answer,
          selected: false
        }
      })
      return arrayObj
      
    }
    const generateQuestionObject = (object) => {
      return {
        id: nanoid(),
        question: object.question,
        correctAnswer: object.correct_answer,
        answers: generateAnswerObj(object)
      }
    }
    
    setQuestions( data.map((item) => generateQuestionObject(item)))
  }, [data])
  
// WORK ON THE SELCT ANSWERSTATE ----------------------------------------
  useEffect(() => {
      // check if selected true and add the answer id to array
      let arrayOfSelectedAnswer= []
      questions.forEach((quest) => {
        quest.answers.forEach((ans) => {
          if (ans.selected){
            arrayOfSelectedAnswer.push({answerId: ans.id,
                                        answer: ans.answer,
                                        questionId: quest.id,
                                        correct: ans.answer === quest.correctAnswer
                                                })
          }
        })
        
      })
      setSelectedAnswer(arrayOfSelectedAnswer)
   
  }, [questions])
  console.log(selectedAnswer);
  // ----------------------------------------------------------------
  // console.log(question);
  if (loading) {
    return <p>data is loading</p>
  }

  if (error ) {
    return <p>there was an error loading the quiz question</p>
  }
  // console.log(data);
  // data.map((obj => {
  //   generateAnswer(obj)

  // }))



  // console.log(question.answers);
 
  
  // console.log(questions);
  function handleClick(questionId, answerId){
    setQuestions(oldQuestion => {
      return oldQuestion.map((question) => {
        if (question.id !== questionId) {          
          return question
        } else {
          return {
            ...question,
            answers: question.answers.map((ans) => {
              if (ans.id !== answerId) {            
                return {
                  id: ans.id,
                  answer: ans.answer,
                  selected: false
                }
              } else {                
                return {
                  ...ans,
                  selected: true
                }
              }
            })
          }
          
        }
      })
     

  })
  
}

  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  function CheckAnswer(){
    
    
    questions.forEach((question) => {
      // console.log(question);
      selectedAnswer.forEach((answ) => {
        if (question.correctAnswer === answ.answer ) {
          setCounterCorrectAnswer(oldCount => oldCount + 1)
        }
      })
    })
    setButtonClicked(true)
  }

  console.log(counterCorrectAnswer);
  const questionElements = questions.map((question) => {
    // console.log(question.id);
    return <Question click={(e) => handleClick(question.id, e.target.id)}
                     key={question.id}
                     question={question.question} 
                     answers={question.answers}
                     setQuestions={setQuestions} 
                      />
  })

  return (
    <section className='container'>
      { !started && <Button clickHandler={startGame} text="Start Quiz" className="start-button"/>}
      {started && questionElements}
      <div>
        {started && <Button  clickHandler={CheckAnswer} text={buttonClicked ? "Play again" : "Check answers"} className="start-button"/>}
        {buttonClicked && <p>You scored {counterCorrectAnswer}/5 correct answers</p>}
      </div>
    </section>
  );
}

export default App;


// TIPS 
// - at the generate answer obj I would add also if is the correct answer so wen click 
// - if selected true add bcgrouncolor to green