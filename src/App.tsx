import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { Difficulty, QuestionState, fetchQuizQuestions } from './API';


type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnwer: string
}

const App = () => {
  const TOTAL_QUESTIONS = 10
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    // console.log(newQuestions) 
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer == answer
      if (correct) setScore(prev => prev + 1)
      const answerObj = {
        question: questions[number].question, 
        answer,
        correct
      }
    }
  }

  const nextQuestion = () => {

  }

  return (
    <div>
      <h1>React Trivia</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
        <button className='start' onClick={startTrivia}>
          Begin
        </button> : null
      }
      {!gameOver && <p className="score">Score:</p>}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />)}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      }
    </div>
  )
}

export default App;
