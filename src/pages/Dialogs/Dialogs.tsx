import { ChangeEvent } from "react"
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogItem/DialogItem"
import { Message } from "./Message/Message"
import { addMessageAC, updateNewMessageAC } from "../../redux/dialogsReducer/dialogsReducer"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { Field, InjectedFormProps, reduxForm } from "redux-form"

export const Dialogs = withAuthRedirect(() => {
  const { dialogs, messages, newMessageText } = useAppSelector((state) => state.dialogs)
  const dispatch = useAppDispatch()

  const sendMessage = () => {
    dispatch(addMessageAC())
  }
  const updateNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNewMessageAC(e.currentTarget.value))
  }
  const onSubmit = (formData: DialogsFormData) => {
    console.log(formData)
    dispatch(updateNewMessageAC(formData.message))
    dispatch(addMessageAC())
  }

  let dialogsElements = dialogs.map((u) => <DialogItem key={u.id} id={u.id} name={u.name} />)
  let messagesElements = messages.map((m) => <Message key={m.id} message={m.message} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      {/* <textarea value={newMessageText} onChange={updateNewMessage} />
      <button onClick={sendMessage}>Submit</button> */}
      <DialogsReduxForm onSubmit={onSubmit} />
    </div>
  )
})

type DialogsFormData = {
  message: string
}

const DialogsForm: React.FC<InjectedFormProps<DialogsFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={"textarea"} name="message" placeholder="message" />
      <button>Submit</button>
    </form>
  )
}

const DialogsReduxForm = reduxForm<DialogsFormData>({ form: "dialogs" })(DialogsForm)
