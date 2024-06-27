import s from "./Header.module.css"
import { logout } from "../../store/authReducer/authReducer"
import { Icon } from "../../components/Icon/Icon"
import { useAppDispatch, useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"

export const Header = () => {
  const { isAuth, login } = useAppSelector(authSelectors.selectAuthState)
  const dispatch = useAppDispatch()

  const logoutOnClick = () => dispatch(logout())

  return (
    <header className={s.header}>
      <Icon id="logo" />

      <div className={s.loginBlock}>
        {isAuth && (
          <>
            {login}
            <br />
            <button onClick={logoutOnClick}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}
