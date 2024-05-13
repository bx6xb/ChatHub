import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../redux/store"

export const Login = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return <div>Login page</div>
}
