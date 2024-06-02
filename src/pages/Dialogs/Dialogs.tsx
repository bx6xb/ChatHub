import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { useAppSelector } from "../../store/store"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { DialogsForm } from "./DialogsForm"

const Dialogs = withAuthRedirect(() => {
  const { dialogs, messages } = useAppSelector((state) => state.dialogs)

  let dialogsElements = dialogs.map((u) => <DialogItem key={u.id} id={u.id} name={u.name} />)
  let messagesElements = messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <DialogsForm />
    </div>
  )
})

export default Dialogs
