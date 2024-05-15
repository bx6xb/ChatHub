import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { FormControl } from "../../components/FormControls/FormControls"
import { maxLengthCreator, required } from "../../utils/validators/validators"

const maxLengthValidator = maxLengthCreator(10)

const Form: React.FC<InjectedFormProps<DialogsFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={FormControl}
        tag="textarea"
        validate={[required, maxLengthValidator]}
        name="message"
        placeholder="message"
      />
      <button>Submit</button>
    </form>
  )
}
export const DialogsForm = reduxForm<DialogsFormData>({ form: "dialogs" })(Form)

// types
export type DialogsFormData = {
  message: string
}
