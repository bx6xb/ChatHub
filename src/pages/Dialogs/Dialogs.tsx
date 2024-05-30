import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { addMessage } from "../../redux/dialogsReducer/dialogsReducer"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { reset } from "redux-form"
import { DialogsForm, DialogsFormData } from "./DialogsForm"

const Dialogs = withAuthRedirect(() => {
  const { dialogs, messages } = useAppSelector((state) => state.dialogs)
  const dispatch = useAppDispatch()

  const onSubmit = (formData: DialogsFormData) => {
    dispatch(addMessage({ message: formData.message }))
    dispatch(reset("dialogs"))
  }

  let dialogsElements = dialogs.map((u) => <DialogItem key={u.id} id={u.id} name={u.name} />)
  let messagesElements = messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <DialogsForm onSubmit={onSubmit} />
    </div>
  )
})

export default Dialogs
