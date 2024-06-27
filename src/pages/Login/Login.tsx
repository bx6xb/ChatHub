import { Navigate } from "react-router-dom"
import { LoginForm } from "./LoginForm/LoginForm"
import { useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"

const Login = () => {
  const isAuth = useAppSelector(authSelectors.selectIsAuth)

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
