import { ChangeEvent } from "react"
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { addMessageAC, updateNewMessageAC } from "../../redux/dialogsReducer/dialogsReducer"
import { useAppDispatch, useAppSelector } from "../../redux/store"

export const Dialogs = () => {
  const { dialogs, messages, newMessageText } = useAppSelector((state) => state.dialogs)
  const dispatch = useAppDispatch()

  const sendMessage = () => {
    dispatch(addMessageAC())
  }
  const updateNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNewMessageAC(e.currentTarget.value))
  }

  let dialogsElements = dialogs.map((u) => <DialogItem key={u.id} id={u.id} name={u.name} />)
  let messagesElements = messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <textarea value={newMessageText} onChange={updateNewMessage} />
      <button onClick={sendMessage}>Submit</button>
    </div>
  )
}
