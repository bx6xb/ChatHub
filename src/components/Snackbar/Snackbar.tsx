import { useEffect, useState } from 'react'
import s from './Snackbar.module.scss'
import { useAppSelector } from '../../utils/redexUtils'
import { appSelectors } from '../../store/appReducer'

export const Snackbar = () => {
  const error = useAppSelector(appSelectors.selectError)

  const [isOpen, setOpen] = useState(false)
  const [intervalId, setIntervalId] = useState<number>()

  useEffect(() => {
    if (error) {
      setOpen(true)
      setIntervalId(
        +setTimeout(() => {
          setOpen(false)
        }, 4000)
      )
    }

    return () => clearInterval(intervalId)
  }, [error])

  const snackbarStyle = s.snackbar + (isOpen ? '' : ' ' + s.hidden)

  return (
    <div className={snackbarStyle}>
      {error} <button onClick={() => setOpen(false)}>x</button>
    </div>
  )
}
