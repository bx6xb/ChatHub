import { Dialogs } from "./Dialogs"
import { addMessageAC, updateNewMessageAC } from "../../redux/dialogsReducer"
import { StoreType } from "../../redux/state"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"

type DialogsPropsType = {
  store: StoreType // fix type
}

export const DialogsContainer = (props: DialogsPropsType) => {
  const state = props.store.getState()
  const dispatch = props.store.dispatch

  const onSendMessageClick = () => {
    let action = addMessageAC()
    dispatch(action)
  }

  const onNewMessageChange = (text: string) => {
    if (text.trim()) {
      let action = updateNewMessageAC(text.trim())
      dispatch(action)
    }
  }

  let dialogsElements = state.dialogsPage.dialogs.map((u) => (
    <DialogItem key={u.id} id={u.id} name={u.name} />
  ))

  let messagesElements = state.dialogsPage.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ))

  return (
    <Dialogs
      updateNewMessage={onNewMessageChange}
      sendMessage={onSendMessageClick}
      dialogsPage={state.dialogsPage}
    />
  )
}
