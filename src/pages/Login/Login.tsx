import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { FormData } from "../../api/api"
import { login } from "../../redux/authReducer/authReducer"
import { LoginForm } from "./LoginForm/LoginForm"

const Login = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onSubmit = (formData: FormData) => {
    dispatch(login(formData))
  }

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

export default Login
