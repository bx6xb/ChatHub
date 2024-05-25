import { NavLink } from "react-router-dom"
import s from "./Header.module.css"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { logout } from "../../redux/authReducer/authReducer"

export const Header = () => {
  const { isAuth, login } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const logout = () => dispatch(logout())

  return (
    <header className={s.header}>
      <span>logo</span>

      <div className={s.loginBlock}>
        {isAuth ? (
          <>
            {login}
            <br />
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  )
}
