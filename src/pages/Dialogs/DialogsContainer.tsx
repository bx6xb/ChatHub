import { Dialogs } from "./Dialogs"
import {
  DialogsPageStateType,
  addMessageAC,
  updateNewMessageAC,
} from "../../redux/dialogsReducer/dialogsReducer"
import { AppRootStateType } from "../../redux/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const DialogsContainer = () => {
  const dialogsPage = useSelector<AppRootStateType, DialogsPageStateType>(
    (state) => state.dialogsPage
  )
  const dispatch = useDispatch()

  const sendMessage = () => {
    dispatch(addMessageAC())
  }

  const updateNewMessage = (text: string) => {
    dispatch(updateNewMessageAC(text))
  }

  return (
    <Dialogs
      sendMessage={sendMessage}
      updateNewMessage={updateNewMessage}
      dialogsPage={dialogsPage}
    />
  )
}
