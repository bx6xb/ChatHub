import s from "./Sidebar.module.css"
import { NavLink } from "react-router-dom"
import userPhoto from "../../assets/images/userDefaultPhoto.png"
import { Preloader } from "../../components/Preloader/Preloader"
import { useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"
import { sidebarSelectors } from "../../store/sidebarReducer"

const menuItems = [
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Messages",
    path: "/dialogs",
  },
  {
    name: "Users",
    path: "/users",
  },
]

export const Sidebar = () => {
  const users = useAppSelector(sidebarSelectors.selectUsers)
  const isAuth = useAppSelector(authSelectors.selectIsAuth)

  return (
    <aside className={s.sidebar}>
      <nav>
        <ul className={s.menu}>
          {menuItems.map((i) => {
            return (
              <li key={i.name} className={s.menuItem}>
                <NavLink to={i.path} className={({ isActive }) => (isActive ? s.active : "")}>
                  {i.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {isAuth && (
        <div className={s.users}>
          {users ? (
            users.map((u) => (
              <NavLink key={u.id} to={"profile/" + u.id.toString()} className={s.link}>
                <img src={u.photos.small || userPhoto} alt="avatar" className={s.userPhoto} />
                <span className={s.name}>{u.name}</span>
              </NavLink>
            ))
          ) : (
            <Preloader />
          )}
        </div>
      )}
    </aside>
  )
}
