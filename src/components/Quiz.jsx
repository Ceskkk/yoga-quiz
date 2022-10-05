import { useState } from 'react'

import poses from '../data/poses.json'
import useCounter from '../hooks/useCounter'

import styles from '../styles/Quiz.module.css'

export const NUMBER_OF_QUESTIONS = 10
export const NUMBER_OF_ANSWERS = 4

export default function Quiz () {
  const [questions, setQuestions] = useState(undefined)
  const [correctQuestion, setCorrectQuestion] = useState(undefined)

  const [isQuizOn, setQuiz] = useState(false)

  const currentQuestion = useCounter(1)
  const correctAnswers = useCounter(0)

  const startQuiz = () => {
    resetCounters()
    getNewQuestions()
    setQuiz(true)
  }

  const resetCounters = () => {
    currentQuestion.reset()
    correctAnswers.reset()
  }

  const getNewQuestions = () => {
    const differentNumbers = new Set()
    const correct = Math.floor(Math.random() * (NUMBER_OF_ANSWERS - 1))
    while (differentNumbers.size < NUMBER_OF_ANSWERS) {
      differentNumbers.add(Math.floor(Math.random() * poses.length))
    }
    setQuestions(Array.from(differentNumbers))
    setCorrectQuestion(correct)
  }

  const selectAnswer = (answer) => {
    if (answer === poses[correctQuestion].name) {
      correctAnswers.increment()
    }

    if (currentQuestion.counter < NUMBER_OF_QUESTIONS) {
      currentQuestion.increment()
      getNewQuestions()
    } else if (currentQuestion.counter === NUMBER_OF_QUESTIONS) {
      setQuiz(false)
    }
  }

  return (
    <section className={styles.container}>
      {questions && (
        <>
          <h1>Question {currentQuestion.counter} / {NUMBER_OF_QUESTIONS}</h1>
          <h3>Correct answers: {correctAnswers.counter}</h3>
        </>
      )}

      <div className={styles.image}>
        {isQuizOn && <img src={`/assets/${poses[correctQuestion].image}`} />}
      </div>

      <div className={styles.answers}>
        {isQuizOn && questions.map(q =>
          <button key={poses[q].id} onClick={() => selectAnswer(poses[q].name)}>
            {poses[q].name}
          </button>
        )}
      </div>

      <button onClick={startQuiz} className={`${styles.quiz} ${questions ? styles.end : styles.start}`}>
        {questions
          ? isQuizOn
            ? 'Reset'
            : 'Try again'
          : 'Start Quiz'}
      </button>

    </section>
  )
}
