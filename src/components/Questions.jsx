import { useContext } from 'react'

import Button from './Button'
import { QuizContext } from '../context/QuizContext'
import styles from '../styles/Questions.module.css'

export default function Questions () {
  const {
    isAnswered,
    questionsState,
    checkAnswer,
    nextQuestion
  } = useContext(QuizContext)

  return (
    <>
      <div className={styles.image}>
        <img
          src={`/assets/${questionsState.correct.image}`}
          key={questionsState.correct.image}
        />
      </div>

      <div id='answers' className={`${styles.answers} ${isAnswered ? styles.answered : ''}`}>
        {questionsState.current.map((q) =>
          <Button key={q.id} clickHandler={(e) => checkAnswer(e, q.name)}>
            {q.name}
          </Button>
        )}
      </div>

      {isAnswered &&
        <Button clickHandler={nextQuestion} type='correct'>
          Next
        </Button>}
    </>
  )
}
