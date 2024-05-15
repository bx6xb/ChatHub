import { Field, InjectedFormProps, reduxForm } from "redux-form"

const Form: React.FC<InjectedFormProps<DialogsFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={"textarea"} name="message" placeholder="message" />
      <button>Submit</button>
    </form>
  )
}
export const DialogsForm = reduxForm<DialogsFormData>({ form: "dialogs" })(Form)

// types
export type DialogsFormData = {
  message: string
}
