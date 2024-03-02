import { ChangeEvent } from "react"
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { ActionType, DialogsPageType } from "../../redux/state"
import { addMessageAC, updateNewMessageAC } from "../../redux/dialogsReducer"

type DialogsPropsType = {
  state: DialogsPageType
  dispatch: (action: ActionType) => void
}

export const Dialogs = (props: DialogsPropsType) => {
  const onClickSubmitHandler = () => {
    let action = addMessageAC()
    props.dispatch(action)
  }

  const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    if (text.trim()) {
      let action = updateNewMessageAC(text.trim())
      props.dispatch(action)
    }
  }

  let dialogsElements = props.state.dialogs.map((u) => (
    <DialogItem key={u.id} id={u.id} name={u.name} />
  ))

  let messagesElements = props.state.messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <textarea value={props.state.newMessageText} onChange={onTextAreaChangeHandler} />
      <button onClick={onClickSubmitHandler}>Submit</button>
    </div>
  )
}
