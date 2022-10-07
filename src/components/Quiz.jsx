import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Button from './Button'
import styles from '../styles/Quiz.module.css'

export default function Quiz () {
  const {
    isQuizOn,
    questionsState,
    selectAnswer,
    startQuiz
  } = useContext(QuizContext)

  return (
    <section className={styles.container}>
      {questionsState.current && (
        <>
          <h1>Question {questionsState.currentCounter} / {questionsState.total}</h1>
          <h3>Correct answers: {questionsState.correctCounter}</h3>
        </>
      )}

      {isQuizOn &&
        <div className={styles.image}>
          <img src={`/assets/${questionsState.correct.image}`} />
        </div>}

      {isQuizOn &&
        <div className={styles.answers}>
          {questionsState.current.map((q) =>
            <Button key={q.id} clickHandler={() => selectAnswer(q.name)}>
              {q.name}
            </Button>
          )}
        </div>}

      <Button clickHandler={startQuiz} type={questionsState.current ? 'incorrect' : 'correct'}>
        {questionsState.current
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
// TODO: Molarí también que marcara cual es el correcto
// TODO: Quizás un botón para confirmar

/**
 * Posible features:
 * Escoger el tipo de Yoga del cual hacer el Quiz
 * Dejar elegir el numero de preguntas y de respuestas
 * Botón de descarga del pdf
 */
