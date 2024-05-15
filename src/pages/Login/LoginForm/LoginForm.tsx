import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { FormData } from "../../../api/api"
import { FormControl } from "../../../components/FormControls/FormControls"
import { required } from "../../../utils/validators/validators"
import s from "./LoginForm.module.css"

const Form: React.FC<InjectedFormProps<FormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && <div className={s.error}>{props.error}</div>}
      <div>
        <Field
          placeholder="email"
          name="email"
          component={FormControl}
          tag="input"
          validate={[required]}
        />
      </div>
      <div>
        <Field
          type="password"
          placeholder="password"
          name="password"
          component={FormControl}
          tag="input"
          validate={[required]}
        />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component={"input"} /> remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}
export const LoginForm = reduxForm<FormData>({
  form: "login",
})(Form)
