import { useEffect, useState } from 'react'
import s from './Snackbar.module.scss'
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils'
import { appSelectors } from '../../store/appReducer'
import { Alert } from 'antd'
import { resetAppMessageAndError } from '../../utils/errorHandler'

export const Snackbar = () => {
  // get data from the state
  const isError = useAppSelector(appSelectors.selectIsError)
  const appMessage = useAppSelector(appSelectors.selectAppMessage)

  // dispatch
  const dispatch = useAppDispatch()

  // local state
  const [isOpen, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number>()

  // callbacks
  const onClose = () => {
    resetAppMessageAndError(dispatch)
    setOpen(false)
  }

  // to show and hide snackbar
  useEffect(() => {
    if (appMessage) {
      setOpen(true)
      setTimeoutId(+setTimeout(onClose, 4000))
    }

    return () => clearTimeout(timeoutId)
  }, [appMessage])

  return (
    <>
      {isOpen && (
        <Alert
          message={isError ? 'Error' : 'Success'}
          description={appMessage}
          type={isError ? 'error' : 'success'}
          showIcon
          closable
          className={s.snackbar}
          onClose={onClose}
        />
      )}
    </>
  )
}
