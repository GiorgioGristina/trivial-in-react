import Button from './components/Button';
import Question from './components/Question';
import { nanoid } from 'nanoid'
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [started, setStarted] = useState(false)
  const [data, setData] = useState([])
  const [ questions, setQuestions] = useState([])
  // const [ selectedAnswer, setSelectedAnswer] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  // const [isContainerActive, setIsContainerActive] = useState(false);
  // const answerShuf = []
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

  
  // console.log("start", started);
  // console.log("error", error);


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
    // on click take the value store in a variable
      // const selectedElemetntValue = e.target.textContent
      // console.log(selectedElemetntValue);
    // loop throug the questions and turn select to true the answer that have the same answer value
    // and setAnswerSelected will add the answer 
    
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

console.log(questions);
  

  


  function startGame(){    
    setStarted(oldStart => !oldStart)
  }

  const questionElements = questions.map((question) => {
    // console.log(question.id);
    return <Question click={(e) => handleClick(question.id, e.target.id)}
                     key={question.id}
                    //  questionId={question.id}
                    //  activeContainer={isContainerActive}
                     question={question.question} 
                     answers={question.answers}
                     setQuestions={setQuestions} 
                      />
  })

  return (
    <section className='container'>
      { !started && <Button start={startGame}  className="start-button"/>}
      {started && questionElements}
    </section>
  );
}

export default App;


// TIPS 
// - at the generate answer obj I would add also if is the correct answer so wen click 
// - if selected true add bcgrouncolor to green