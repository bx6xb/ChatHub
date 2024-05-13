import { useAppSelector } from "../redux/store"
import { Navigate } from "react-router-dom"

export function withAuthRedirect<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)

    return isAuth ? <WrappedComponent {...props} /> : <Navigate to="/login" />
  }
}
