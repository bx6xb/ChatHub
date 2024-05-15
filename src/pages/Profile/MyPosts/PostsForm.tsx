import { Field, InjectedFormProps, reduxForm } from "redux-form"

const Form: React.FC<InjectedFormProps<PostsFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="message" component={"textarea"} />
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
