import { NavLink } from "react-router-dom"
import s from "./Header.module.css"

type HeaderPropsType = {
  isAuth: boolean
  login: string | null
}

export const Header = (props: HeaderPropsType) => {
  return (
    <header className={s.header}>
      <img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png" />

      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  )
}
