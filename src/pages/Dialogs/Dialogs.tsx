import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { DialogsForm } from "./DialogsForm"
import { useAppSelector } from "../../utils/redexUtils"
import { dialogsSelectors } from "../../store/dialogsReducer"

const Dialogs = withAuthRedirect(() => {
  const { dialogs, messages } = useAppSelector(dialogsSelectors.selectDialogsState)

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
