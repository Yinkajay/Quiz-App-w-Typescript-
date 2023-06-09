import React from 'react'

type QuestionProps = {
    question: string
    answers: string[]
    callback: any
    userAnswer: any
    questionNumber: number
    totalQuestions: number
}

const QuestionCard: React.FC<QuestionProps> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => {
    return (
        <div>
            <p className="number">
                Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}/>
            <div>
                {answers.map(answer=> (
                    <div key={answer}>
                        <button disabled={userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard