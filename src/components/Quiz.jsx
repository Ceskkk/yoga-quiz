import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'

import styles from '../styles/Quiz.module.css'
import { NUMBER_OF_QUESTIONS } from '../utils/const'
import Button from './Button'

export default function Quiz () {
  const {
    questions,
    correctQuestion,
    isQuizOn,
    currentQuestionCounter,
    correctAnswersCounter,
    selectAnswer,
    startQuiz
  } = useContext(QuizContext)

  return (
    <section className={styles.container}>
      {questions && (
        <>
          <h1>Question {currentQuestionCounter.counter} / {NUMBER_OF_QUESTIONS}</h1>
          <h3>Correct answers: {correctAnswersCounter.counter}</h3>
        </>
      )}

      {isQuizOn &&
        <div className={styles.image}>
          <img src={`/assets/${correctQuestion.image}`} />
        </div>}

      {isQuizOn &&
        <div className={styles.answers}>
          {questions.map((q) =>
            <Button key={q.id} clickHandler={(e) => selectAnswer(e, q.name)}>
              {q.name}
            </Button>
          )}
        </div>}

      <Button clickHandler={startQuiz} type={questions ? 'incorrect' : 'correct'}>
        {questions
          ? isQuizOn
            ? 'Reset'
            : 'Try again'
          : 'Start Quiz'}
      </Button>

    </section>
  )
}

// TODO: Favicon
// TODO: Añadir toda la data
// TODO: Transición

/**
 * Posible features:
 * Escoger el tipo de Yoga del cual hacer el Quiz
 * Dejar elegir el numero de preguntas y de respuestas
 * Botón de descarga del pdf
 */
