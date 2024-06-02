import { useAppSelector } from "../../../store/store"
import s from "./Sidebar.module.css"

export const Sidebar = () => {
  const { friends } = useAppSelector((state) => state.sidebar)

  return (
    <aside
      className={s.item}
      style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}
    >
      {friends.map((fr) => (
        <div key={fr.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className={s["friends-avatar"]} />
          <span className={s["friends-name"]}>{fr.name}</span>
        </div>
      ))}
    </aside>
  )
}
