import { FriendsType } from "../../../redux/state"
import s from "./Sidebar.module.css"

type SidebarPropsType = {
  friends: FriendsType[]
}

export const Sidebar = (props: SidebarPropsType) => {
  return (
    <aside
      className={s.item}
      style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}
    >
      {props.friends.map((fr) => (
        <div key={fr.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className={s["friends-avatar"]} />
          <span className={s["friends-name"]}>{fr.name}</span>
        </div>
      ))}
    </aside>
  )
}
