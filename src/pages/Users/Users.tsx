import { NavLink } from "react-router-dom"
import userPhoto from "../../assets/images/userDefaultPhoto.png"
import s from "./Users.module.css"
// import { Preloader } from "../../components/Preloader/Preloader"
import { useUsers } from "./useUsers"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { Paginator } from "../../components/Paginator/Paginator"

const Users = withAuthRedirect(() => {
  const {
    currentPage,
    totalUsersCount,
    pageSize,
    users,
    isFollowingInProgress,
    followOnClick,
    unfollowOnClick,
    onPageChange,
    isFetching,
  } = useUsers()

  if (isFetching) {
    // return <Preloader />
    return <div>Preloader</div>
  }

  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
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
                <button onClick={() => unfollowOnClick(u.id)} disabled={isDisabled}>
                  unfollow
                </button>
              ) : (
                <button onClick={() => followOnClick(u.id)} disabled={isDisabled}>
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

export default Users
