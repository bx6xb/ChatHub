import { useDispatch } from "react-redux"
import {
  UsersPageStateType,
  changeCurrentPageAC,
  changeTotalUsersCountAC,
  followAC,
  setUsersAC,
  unfollowAC,
} from "../../redux/usersReducer/usersReducer"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../redux/store"
import { useEffect } from "react"
import axios from "axios"
import { Users } from "./Users"

export const UsersContainer = () => {
  const dispatch = useDispatch()
  const state: UsersPageStateType = useSelector((state: AppRootStateType) => state.usersPage)

  useEffect(() => {
    if (state.users.length === 0) {
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${state.currentPage}&count=${state.pageSize}`
        )
        .then((response) => {
          dispatch(setUsersAC(response.data.items))
          dispatch(changeTotalUsersCountAC(response.data.totalCount))

          console.log(response)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  const onPageChange = (pageNumber: number) => {
    dispatch(changeCurrentPageAC(pageNumber))

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${state.pageSize}`
      )
      .then((response) => dispatch(setUsersAC(response.data.items)))
      .catch((err) => console.error(err))
  }

  const follow = (userId: number) => {
    dispatch(followAC(userId))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollowAC(userId))
  }

  return (
    <Users
      currentPage={state.currentPage}
      follow={follow}
      unfollow={unfollow}
      onPageChange={onPageChange}
      pageSize={state.pageSize}
      totalUsersCount={state.totalUsersCount}
      users={state.users}
    />
  )
}
