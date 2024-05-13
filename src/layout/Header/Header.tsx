import { NavLink } from "react-router-dom"
import s from "./Header.module.css"
import { useAppSelector } from "../../redux/store"

export const Header = () => {
  const { isAuth, login } = useAppSelector((state) => state.auth)

  return (
    <header className={s.header}>
      <img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png" />

      <div className={s.loginBlock}>{isAuth ? login : <NavLink to={"/login"}>Login</NavLink>}</div>
    </header>
  )
}
