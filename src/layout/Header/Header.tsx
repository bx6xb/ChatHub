import s from "./Header.module.css"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { logout } from "../../store/authReducer/authReducer"
import { Icon } from "../../components/Icon/Icon"
import { Logo } from "../../components/Logo/Logo"

export const Header = () => {
  const { isAuth, login } = useAppSelector((state) => state.auth)
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
        ) }
      </div>
    </header>
  )
}
