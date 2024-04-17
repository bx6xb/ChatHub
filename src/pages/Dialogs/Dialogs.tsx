import { ChangeEvent } from "react"
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { DialogsPageType } from "../../redux/dialogsReducer/dialogsReducer"

type DialogsPropsType = {
  updateNewMessage: (text: string) => void
  sendMessage: () => void
  dialogsPage: DialogsPageType
}

export const Dialogs = (props: DialogsPropsType) => {
  const state = props.dialogsPage

  const onClickSubmitHandler = () => {
    props.sendMessage()
  }

  const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewMessage(e.currentTarget.value)
  }

  let dialogsElements = state.dialogs.map((u) => <DialogItem key={u.id} id={u.id} name={u.name} />)

  let messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <textarea value={state.newMessageText} onChange={onTextAreaChangeHandler} />
      <button onClick={onClickSubmitHandler}>Submit</button>
    </div>
  )
}
