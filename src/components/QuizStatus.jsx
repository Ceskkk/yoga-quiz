import { useContext } from 'react'

import { QuizContext } from '../context/QuizContext'
import styles from '../styles/QuizStatus.module.css'

export default function QuizStatus () {
  const {
    questionsState
  } = useContext(QuizContext)

  return (
    <div className={styles.titles}>
      <h1>Question {questionsState.currentCounter} / {questionsState.total}</h1>
      <h3>Correct answers: {questionsState.correctCounter}</h3>
    </div>
  )
}
