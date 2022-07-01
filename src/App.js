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
  // console.log(data);
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
      let correctAnswer = data.correct_answer
      const arrayObj = answerOption.map((answer, i) => {
        return {
          id: nanoid(),
          answer: answer,
          selected: false,
          correct: answer === correctAnswer
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
  

  useEffect(() => {
      let arrayOfSelectedAnswer= []
      questions.forEach((quest) => {
        quest.answers.forEach((ans) => {          
          if (ans.selected){
            arrayOfSelectedAnswer.push({answerId: ans.id,
                                        answer: ans.answer,
                                        questionId: quest.id,
                                        rightAns: quest.correctAnswer,
                                        correct: quest.correctAnswer === ans.answer,
                                        showCorrect: false
                                                })
          }
        })
        
      })
      setSelectedAnswer(arrayOfSelectedAnswer)
   
  }, [questions])

  
  if (loading) {
    return <p>data is loading</p>
  }

  if (error ) {
    return <p>there was an error loading the quiz question</p>
  }
  
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
 console.log(selectedAnswer);
  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  function CheckAnswer(){ 
    let newSelectedAnswe = []  
      selectedAnswer.forEach((answ, i) => {    
          if (answ.correct ) {
            setCounterCorrectAnswer(oldCount => oldCount + 1)
            newSelectedAnswe.push(answ)
          } else {
            newSelectedAnswe.push({...answ, showCorrect: true})
          }

       
      })
    setSelectedAnswer(newSelectedAnswe)
    setButtonClicked(true)
  }

  

  
  const questionElements = questions.map((question, i) => {
    return <Question click={(e) => handleClick(question.id, e.target.id)}
                     key={question.id}
                     index={i}
                     question={question.question} 
                     answers={question.answers}
                     selctedAnswer={selectedAnswer}
                     setQuestions={setQuestions} 
                      />
  })

  return (
    <section className={ !started ? 'container' : 'container-quest'}>
      { !started && <Button clickHandler={startGame} text="Start Quiz" className="start-button"/>}
      {started && questionElements}
      <div className='check-answer '>
        {buttonClicked && <p className='correct-answers'>You scored {counterCorrectAnswer}/5 correct answers</p>}
        {started && buttonClicked && <Button  clickHandler={CheckAnswer} text={"Play again"} className="start-button"/>}
        {started && !buttonClicked && <Button  clickHandler={} text={"Check answers"} className="start-button"/>}
      </div>
    </section>
  );
}

export default App;

