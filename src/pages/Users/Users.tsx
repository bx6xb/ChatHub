import { NavLink } from "react-router-dom"
import userPhoto from "../../assets/images/userDefaultPhoto.png"
import s from "./Users.module.css"
import { Preloader } from "../../components/Preloader/Preloader"
import { useUsers } from "./hooks/useUsers"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"

export const Users = withAuthRedirect(() => {
  const { pages, users, isFollowingInProgress, follow, unfollow, isFetching } = useUsers()

  if (isFetching) {
    return <Preloader />
  }

  return (
    <div>
      <div>{pages}</div>
      {users.map((u) => {
        const isDisabled = isFollowingInProgress.some((id) => id === u.id)

        return (
          <div key={u.id}>
            <div>
              <NavLink to={"/profile/" + u.id.toString()}>
                <img src={u.photos.small || userPhoto} alt="avatar" className={s.userPhoto} />
              </NavLink>
            </div>

            <div>
              {u.followed ? (
                <button onClick={() => unfollow(u.id)} disabled={isDisabled}>
                  unfollow
                </button>
              ) : (
                <button onClick={() => follow(u.id)} disabled={isDisabled}>
                  follow
                </button>
              )}
            </div>

            <div>{u.name}</div>
            <div>{u.status}</div>
          </div>
        )
      })}
    </div>
  )
})
