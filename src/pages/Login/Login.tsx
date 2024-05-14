import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import React from "react"
import { FormData } from "../../api/api"
import { loginTC } from "../../redux/authReducer/authReducer"

export const Login = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onSubmit = (formData: FormData) => {
    dispatch(loginTC(formData))
  }

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const LoginForm: React.FC<InjectedFormProps<FormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="email" name="email" component={"input"} />
      </div>
      <div>
        <Field type="password" placeholder="password" name="password" component={"input"} />
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

export const LoginReduxForm = reduxForm<FormData>({
  form: "login",
})(LoginForm)
