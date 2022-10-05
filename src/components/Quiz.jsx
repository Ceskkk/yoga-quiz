import { useState } from 'react'

import useCounter from '../hooks/useCounter'
import poses from '../data/poses.json'

import styles from '../styles/Quiz.module.css'

export const NUMBER_OF_QUESTIONS = 9
export const NUMBER_OF_ANSWERS = 4

export default function Quiz () {
  const [questions, setQuestions] = useState(undefined)
  const [correctQuestion, setCorrectQuestion] = useState(undefined)

  const [questionsAlreadyUsed, setQuestionsAlreadyUsed] = useState([])

  const [isQuizOn, setQuiz] = useState(false)

  const currentQuestion = useCounter(1)
  const correctAnswers = useCounter(0)

  const startQuiz = () => {
    setQuestionsAlreadyUsed([])
    currentQuestion.reset()
    correctAnswers.reset()
    updateQuestions()
    setQuiz(true)
  }

  const updateQuestions = () => {
    let correct
    const otherQuestions = new Set()

    while (correct === undefined || questionsAlreadyUsed.includes(correct.id)) {
      correct = poses[Math.floor(Math.random() * poses.length)]
    }

    console.log(questionsAlreadyUsed)

    while (otherQuestions.size !== NUMBER_OF_ANSWERS - 1) {
      const random = poses[Math.floor(Math.random() * poses.length)]
      if (random.id !== correct.id) otherQuestions.add(random)
    }

    otherQuestions.add(correct)
    setCorrectQuestion(correct)
    setQuestionsAlreadyUsed((prevValue) => [...prevValue, correct.id])
    setQuestions(Array.from(otherQuestions).sort((a, b) => a.id - b.id))
  }

  const selectAnswer = (answer) => {
    if (answer === correctQuestion.name) {
      correctAnswers.increment()
    }

    if (currentQuestion.counter < NUMBER_OF_QUESTIONS) {
      currentQuestion.increment()
      updateQuestions()
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

      {isQuizOn &&
        <div className={styles.image}>
          <img src={`/assets/${correctQuestion.image}`} />
        </div>}

      <div className={styles.answers}>
        {isQuizOn && questions.map(q =>
          <button key={q.id} onClick={() => selectAnswer(q.name)}>
            {q.name}
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

// TODO: Favicon
// TODO: Añadir toda la data
