import { Flex } from 'antd'
import { Snackbar } from '../../components/Snackbar/Snackbar'
import { removeAppMessage } from '../../store/app/reducer'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import s from './SnackbarContainer.module.scss'
import { selectAppMessages } from '../../store/app/selectors'

export const SnackbarContainer = () => {
  // get data from the state
  const appMessages = useAppSelector(selectAppMessages)

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
