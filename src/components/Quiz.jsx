import { useContext } from 'react'

import Questions from './Questions'
import QuizForm from './QuizForm'
import QuizStatus from './QuizStatus'
import { QuizContext } from '../context/QuizContext'
import styles from '../styles/Quiz.module.css'

export default function Quiz () {
  const {
    isQuizOn,
    questionsState
  } = useContext(QuizContext)

  return (
    <section className={styles.container}>

      {questionsState.current && <QuizStatus />}

      {isQuizOn ? <Questions /> : <QuizForm />}

    </section>
  )
}
