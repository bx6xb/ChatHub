import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { FormControl } from "../../../components/FormControls/FormControls"

const maxLengthValidator = maxLengthCreator(10)

const Form: React.FC<InjectedFormProps<PostsFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="message"
          component={FormControl}
          tag="textarea"
          validate={[required, maxLengthValidator]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}
export const PostsForm = reduxForm<PostsFormData>({ form: "posts" })(Form)

// types
export type PostsFormData = {
  message: string
}
