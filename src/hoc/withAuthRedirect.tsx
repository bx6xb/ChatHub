import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../utils/reduxUtils'
import { authSelectors } from '../store/authReducer'

export function withAuthRedirect<T extends {}>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const isAuth = useAppSelector(authSelectors.selectIsAuth)

    return isAuth ? <WrappedComponent {...props} /> : <Navigate to="/login" />
  }
}
