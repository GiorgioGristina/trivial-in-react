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
  // i would create a state that contain an array of correct answer ids for the 
  //question where he select the wrong one so when they click check answer button
  // will be highlited in red the correct when when the user picke d the correct one
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
  console.log(data);
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
      // console.log(correctAnswer);
  
      const arrayObj = answerOption.map((answer, i) => {
        // console.log(questions);
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
  
// WORK ON THE SELCT ANSWERSTATE ----------------------------------------
  useEffect(() => {
      // check if selected true and add the answer id to array
      let arrayOfSelectedAnswer= []
      questions.forEach((quest) => {
        quest.answers.forEach((ans) => {
          
          
          if (ans.selected){
            // console.log(ans.answer,quest.correctAnswer );
            arrayOfSelectedAnswer.push({answerId: ans.id,
                                        answer: ans.answer,
                                        questionId: quest.id,
                                        correct: quest.correctAnswer === ans.answer,
                                        showCorrect: false
                                                })
          }
        })
        
      })
      setSelectedAnswer(arrayOfSelectedAnswer)
   
  }, [questions])
// console.log(selectedAnswer);
  
  
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

  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  // setSelectedAnswer(oldSelection => [...oldSelection, {...answ, showCorrect: true}])

  function CheckAnswer(){ 
    let newSelectedAnswe = []  
    
      // console.log(question);
      selectedAnswer.forEach((answ, i) => {    
          if (answ.correct ) {
            setCounterCorrectAnswer(oldCount => oldCount + 1)
            newSelectedAnswe.push(answ)
          } else {
            newSelectedAnswe.push({...answ, showCorrect: true})
          }

       
      })
   
    // console.log(newSelectedAnswe);
    setSelectedAnswer(newSelectedAnswe)
    setButtonClicked(true)
  }
// console.log(selectedAnswer);
  
  const questionElements = questions.map((question, i) => {
    // console.log(question.id);
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