import { createContext, useState } from 'react'
import useCounter from '../hooks/useCounter'

import poses from '../data/poses.json'
import { NUMBER_OF_ANSWERS, NUMBER_OF_QUESTIONS } from '../utils/const'

export const QuizContext = createContext()

export default function QuizProvider ({ children }) {
  const [questions, setQuestions] = useState(undefined)
  const [correctQuestion, setCorrectQuestion] = useState(undefined)
  const [questionsIdAlreadyUsed, setQuestionsIdAlreadyUsed] = useState([])
  const [isQuizOn, toggleQuiz] = useState(false)
  const currentQuestionCounter = useCounter(1)
  const correctAnswersCounter = useCounter(0)

  const startQuiz = () => {
    setQuestionsIdAlreadyUsed([])
    currentQuestionCounter.reset()
    correctAnswersCounter.reset()
    updateQuestions()
    toggleQuiz(true)
  }

  const updateQuestions = () => {
    let correct
    const otherQuestions = new Set()

    while (correct === undefined || questionsIdAlreadyUsed.includes(correct.id)) {
      correct = poses[Math.floor(Math.random() * poses.length)]
    }

    while (otherQuestions.size !== NUMBER_OF_ANSWERS - 1) {
      const random = poses[Math.floor(Math.random() * poses.length)]
      if (random.id !== correct.id) otherQuestions.add(random)
    }

    otherQuestions.add(correct)
    setCorrectQuestion(correct)
    setQuestionsIdAlreadyUsed((prevValue) => [...prevValue, correct.id])
    setQuestions(Array.from(otherQuestions).sort((a, b) => a.id - b.id))
  }

  const selectAnswer = (e, answer) => {
    if (answer === correctQuestion.name) {
      correctAnswersCounter.increment()
    }

    if (currentQuestionCounter.counter < NUMBER_OF_QUESTIONS) {
      currentQuestionCounter.increment()
      updateQuestions()
    } else if (currentQuestionCounter.counter === NUMBER_OF_QUESTIONS) {
      toggleQuiz(false)
    }
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        correctQuestion,
        isQuizOn,
        currentQuestionCounter,
        correctAnswersCounter,
        selectAnswer,
        startQuiz
      }}
    > {children}
    </QuizContext.Provider>
  )
}
