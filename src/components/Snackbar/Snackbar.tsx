import { useEffect, useState } from "react"
import s from "./Snackbar.module.css"

export const Snackbar = ({ message, autoHideDuration = 4000 }: SnackbarProps) => {
  const [isOpen, setOpen] = useState(false)
  const [intervalId, setIntervalId] = useState<number>()

  useEffect(() => {
    if (message) {
      setOpen(true)
      setIntervalId(
        +setTimeout(() => {
          setOpen(false)
        }, autoHideDuration)
      )
    }

    return () => clearInterval(intervalId)
  }, [message])

  return (
    <div className={s.snackbar + (isOpen ? "" : " " + s.hidden)}>
      {message} <button onClick={() => setOpen(false)}>x</button>
    </div>
  )
}

// types
type SnackbarProps = {
  message: string | null
  autoHideDuration?: number
}
