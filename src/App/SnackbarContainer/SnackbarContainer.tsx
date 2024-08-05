import { Flex } from 'antd'
import { Snackbar } from '../../components/Snackbar/Snackbar'
import { appSelectors } from '../../store/appReducer'
import { removeAppMessage } from '../../store/appReducer/appReducer'
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils'
import s from './SnackbarContainer.module.scss'

export const SnackbarContainer = () => {
  // get data from the state
  const appMessages = useAppSelector(appSelectors.selectAppMessages)

  // dispatch
  const dispatch = useAppDispatch()

  // callbacks
  const onClose = (id: string) => {
    dispatch(removeAppMessage(id))
  }

  // jsx variables
  const mappedAppMessages = appMessages.map(m => (
    <Snackbar key={m.id} appMessage={m} onClose={onClose} />
  ))

  return (
    <Flex vertical gap={5} className={s.snackbarContainer}>
      {mappedAppMessages}
    </Flex>
  )
}
