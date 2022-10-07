export default function Button ({ children, clickHandler = () => {}, type = '' }) {
  return (
    <button onClick={clickHandler} className={type}>
      {children}
    </button>
  )
}
