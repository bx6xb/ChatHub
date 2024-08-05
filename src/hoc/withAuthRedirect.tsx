import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../utils/reduxUtils/reduxUtils'
import { selectIsAuth } from '../store/auth/selectors'

export function withAuthRedirect<T extends {}>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const isAuth = useAppSelector(selectIsAuth)

    return isAuth ? <WrappedComponent {...props} /> : <Navigate to="/login" />
  }
}
