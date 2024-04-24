import { useSelector } from "react-redux"
import { AppRootStateType } from "../redux/store"
import { Navigate } from "react-router-dom"

export function withAuthRedirect<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.auth.isAuth)

    return isAuth ? <WrappedComponent {...props} /> : <Navigate to="/login" />
  }
}
