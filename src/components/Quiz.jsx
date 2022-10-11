import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Button from './Button'
import { getAllStyles, getPosesByStyle } from '../services/poses'
import styles from '../styles/Quiz.module.css'

export default function Quiz () {
  const {
    isQuizOn,
    isAnswered,
    questionsState,
    checkAnswer,
    nextQuestion,
    setFilters,
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
        <>
          <form className={styles.filters} onSubmit={(e) => startQuiz(e)}>
            <div className={styles.filter}>
              <h3>Asana Style</h3>
              <select name='currentStyle' defaultValue={questionsState.currentStyle} onChange={(e) => setFilters(e)}>
                <option value='all'>
                  ALL ({getPosesByStyle('all').length})
                </option>
                {getAllStyles().map((yogaStyle, index) =>
                  <option key={index} value={yogaStyle}>
                    {yogaStyle} ({getPosesByStyle(yogaStyle).length})
                  </option>
                )}
              </select>
            </div>

            <div className={`${styles.filter} ${styles.filterNumber}`}>
              <h3>Number of questions</h3>
              <span onClick={(e) => {
                e.target.nextSibling.value > e.target.nextSibling.min && e.target.nextSibling.value--
                e.target.nextSibling.click()
              }}
              >-
              </span>
              <input
                onClick={(e) => setFilters(e)}
                type='number'
                name='total'
                defaultValue={questionsState.total}
                min={1}
                max={getPosesByStyle(questionsState.currentStyle).length}
              />
              <span onClick={(e) => {
                e.target.previousSibling.value < e.target.previousSibling.max && e.target.previousSibling.value++
                e.target.previousSibling.click()
              }}
              >+
              </span>
            </div>

            <Button type={questionsState.current ? 'incorrect' : 'correct'}>
              {questionsState.current
                ? 'Try again'
                : 'Start Quiz'}
            </Button>
          </form>
        </>}

      {isAnswered && isQuizOn &&
        <Button clickHandler={nextQuestion} type='correct'>
          Next
        </Button>}

    </section>
  )
}

// TODO: Hacer fotos quadradas
// TODO: Arreglar responsive

/**
 * Posible features:
 *  - Botón de descarga del pdf
 *  - Buscador de Asanas
 */
