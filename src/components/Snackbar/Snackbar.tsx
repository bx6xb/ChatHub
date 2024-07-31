import { useEffect, useState } from 'react'
import s from './Snackbar.module.scss'
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils'
import { appSelectors } from '../../store/appReducer'
import { Alert } from 'antd'
import { resetAppError } from '../../utils/errorHandler'

export const Snackbar = () => {
  // get data from the state
  const error = useAppSelector(appSelectors.selectError)

  // dispatch
  const dispatch = useAppDispatch()

  // local state
  const [isOpen, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number>()

  // to show and hide snackbar
  useEffect(() => {
    if (error) {
      setOpen(true)
      setTimeoutId(
        +setTimeout(() => {
          setOpen(false)
          resetAppError(dispatch)
        }, 4000)
      )
    }

    return () => clearTimeout(timeoutId)
  }, [error])

  return (
    <>
      {isOpen && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          className={s.snackbar}
          onClose={() => resetAppError(dispatch)}
        />
      )}
    </>
  )
}
