import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../store/store"
import { LoginForm } from "./LoginForm/LoginForm"

const Login = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  )
}

export default Login
