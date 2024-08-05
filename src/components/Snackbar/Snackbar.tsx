import { useEffect, useState } from 'react'
import s from './Snackbar.module.scss'
import { Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import { AppMessage } from '../../store/app/types'

type SnackbarProps = {
  appMessage: AppMessage
  onClose: (id: string) => void
}

export const Snackbar = (props: SnackbarProps) => {
  const {
    appMessage: { id, isError, message }
  } = props

  // localizations
  const { t } = useTranslation()

  // local state
  const [isOpen, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number>()

  // callbacks
  const onClose = () => {
    props.onClose(id)
    setOpen(false)
  }

  // to show and hide snackbar
  useEffect(() => {
    if (message) {
      setOpen(true)
      setTimeoutId(+setTimeout(onClose, 2500))
    }

    return () => clearTimeout(timeoutId)
  }, [message])

  return (
    <>
      {isOpen && (
        <Alert
          message={isError ? t('Snackbar_error') : t('Snackbar_message')}
          description={message}
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
