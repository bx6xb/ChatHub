import { SidebarType } from "../../redux/state"
import s from "./Navbar.module.css"
import { NavLink } from "react-router-dom"

type NavbarPropsType = {
  state: SidebarType
}

export const Navbar = (props: NavbarPropsType) => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? s.activeLink : "")}>
          Profile
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" className={({ isActive }) => (isActive ? s.activeLink : "")}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <a>News</a>
      </div>
      <div className={s.item}>
        <a>Music</a>
      </div>
      <div className={s.item}>
        <a>Settings</a>
      </div>
      <aside className={s.item} style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
        {props.state.friends.map((fr) => (
          <div key={fr.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className={s["friends-avatar"]} />
            <span className={s["friends-name"]}>{fr.name}</span>
          </div>
        ))}
      </aside>
    </nav>
  )
}
