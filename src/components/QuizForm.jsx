import { useContext } from 'react'

import Button from './Button'
import { QuizContext } from '../context/QuizContext'
import { getAllStyles, getPosesByStyle } from '../services/poses'
import styles from '../styles/QuizForm.module.css'

export default function QuizForm () {
  const {
    questionsState,
    setFilters,
    startQuiz,
    endQuiz
  } = useContext(QuizContext)

  return (
    <form className={styles.filters} onSubmit={questionsState.current ? (e) => endQuiz(e) : (e) => startQuiz(e)}>

      {!questionsState.current && (
        <>
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
              if (Number(e.target.nextSibling.value) > Number(e.target.nextSibling.min)) e.target.nextSibling.value--
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
              if (Number(e.target.previousSibling.value) < Number(e.target.previousSibling.max)) e.target.previousSibling.value++
              e.target.previousSibling.click()
            }}
            >+
            </span>
          </div>
        </>
      )}

      <Button type={questionsState.current ? 'incorrect' : 'correct'}>
        {questionsState.current
          ? 'Try again'
          : 'Start Quiz'}
      </Button>

    </form>
  )
}
