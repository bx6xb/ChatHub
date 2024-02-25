import { createRef } from "react"
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { DialogsPageType } from "../../redux/state"

type DialogsPropsType = {
  state: DialogsPageType
}

export const Dialogs = (props: DialogsPropsType) => {
  const textareaRef = createRef<HTMLTextAreaElement>()

  const onClickSubmitHandler = () => {
    let text = textareaRef.current?.value
    if (text) {
      alert(text)
    }
  }

  let dialogsElements = props.state.dialogs.map((u) => <DialogItem key={u.id} id={u.id} name={u.name} />)

  let messagesElements = props.state.messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <textarea ref={textareaRef} />
      <button onClick={onClickSubmitHandler}>Submit</button>
    </div>
  )
}
