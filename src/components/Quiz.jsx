import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Button from './Button'
import styles from '../styles/Quiz.module.css'

export default function Quiz () {
  const {
    isQuizOn,
    isAnswered,
    questionsState,
    checkAnswer,
    nextQuestion,
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
        <div id='answers' className={`${styles.answers} ${isAnswered ? styles.answered : ''}`}>
          {questionsState.current.map((q) =>
            <Button key={q.id} clickHandler={(e) => checkAnswer(e, q.name)}>
              {q.name}
            </Button>
          )}
        </div>}

      {!isQuizOn &&
        <Button clickHandler={startQuiz} type={questionsState.current ? 'incorrect' : 'correct'}>
          {questionsState.current
            ? 'Try again'
            : 'Start Quiz'}
        </Button>}

      {isAnswered && isQuizOn &&
        <Button clickHandler={nextQuestion} type='correct'>
          Next
        </Button>}

    </section>
  )
}

// TODO: Añadir toda la data | Fotos se alargan mucho

/**
 * Posible features:
 *  - Escoger el tipo de Yoga del cual hacer el Quiz
 *  - Dejar elegir el numero de preguntas y de respuestas
 *  - Botón de descarga del pdf
 */
