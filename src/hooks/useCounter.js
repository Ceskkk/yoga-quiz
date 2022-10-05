import { useState } from 'react'

export default function useCounter (initialValue) {
  const [counter, setCounter] = useState(initialValue)

  const increment = () => setCounter(x => x + 1)
  const reset = () => setCounter(initialValue)

  return {
    counter,
    increment,
    reset
  }
}
