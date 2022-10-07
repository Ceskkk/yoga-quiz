import { createContext, useState } from 'react'
import { NUMBER_OF_ANSWERS } from '../utils/const'
import poses from '../data/poses.json'

export const QuizContext = createContext()

export default function QuizProvider ({ children }) {
  const initialQuestionsState = {
    current: undefined,
    correct: undefined,
    used: [0, 1],
    total: 10,
    currentCounter: 1,
    correctCounter: 0
  }
  const [questionsState, setQuestionsState] = useState(initialQuestionsState)
  const [isQuizOn, toggleQuiz] = useState(false)

  const startQuiz = () => {
    setQuestionsState(initialQuestionsState)
    updateQuestions()
    toggleQuiz(true)
  }

  const updateQuestions = () => {
    let correctQuestion
    const questions = new Set()

    while (correctQuestion === undefined || Array.from(questionsState.used).includes(correctQuestion.id)) {
      correctQuestion = poses[Math.floor(Math.random() * poses.length)]
    }

    while (questions.size !== NUMBER_OF_ANSWERS - 1) {
      const random = poses[Math.floor(Math.random() * poses.length)]
      if (random.id !== correctQuestion.id) questions.add(random)
    }

    questions.add(correctQuestion)
    setQuestionsState(prev => ({
      ...prev,
      current: Array.from(questions).sort((a, b) => a.id - b.id),
      correct: correctQuestion,
      used: (prevUsed) => [...prevUsed, correctQuestion.id]
    }))
  }

  const selectAnswer = (answer) => {
    if (answer === questionsState.correct.name) {
      setQuestionsState(prev => ({
        ...prev,
        correctCounter: questionsState.correctCounter + 1
      }))
    }

    if (questionsState.currentCounter < questionsState.total) {
      setQuestionsState(prev => ({
        ...prev,
        currentCounter: questionsState.currentCounter + 1
      }))
      updateQuestions()
    } else {
      toggleQuiz(false)
    }
  }

  return (
    <QuizContext.Provider
      value={{
        isQuizOn,
        questionsState,
        selectAnswer,
        startQuiz
      }}
    > {children}
    </QuizContext.Provider>
  )
}
