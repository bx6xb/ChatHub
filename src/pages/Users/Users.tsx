import { NavLink } from "react-router-dom"
import userPhoto from "../../assets/images/userDefaultPhoto.png"
import { UserType } from "../../redux/usersReducer/usersReducer"
import s from "./Users.module.css"
import { followAPI } from "../../api/api"

type UsersPropsType = {
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  onPageChange: (currentPage: number) => void
}

export const Users = (props: UsersPropsType) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      <span
        onClick={() => props.onPageChange(i)}
        key={i}
        className={props.currentPage === i ? s.selectedPage : ""}
      >
        {i}
      </span>
    )
  }

  return (
    <div>
      <div>{pages}</div>
      {props.users.map((u) => (
        <div key={u.id}>
          <div>
            <NavLink to={"/profile/" + u.id.toString()}>
              <img src={u.photos.small || userPhoto} alt="avatar" className={s.userPhoto} />
            </NavLink>
          </div>

          <div>
            {u.followed ? (
              <button
                onClick={() => {
                  followAPI.deleteFollow(u.id).then((resp) => {
                    if (resp.data.resultCode === 0) {
                      props.unfollow(u.id)
                    }
                  })
                }}
              >
                unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  followAPI.createFollow(u.id).then((resp) => {
                    if (resp.data.resultCode === 0) {
                      props.follow(u.id)
                    }
                  })
                }}
              >
                follow
              </button>
            )}
          </div>

          <div>{u.name}</div>
          <div>{u.status}</div>
        </div>
      ))}
    </div>
  )
}
