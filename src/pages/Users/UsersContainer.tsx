import { useDispatch } from "react-redux"
import {
  UsersPageStateType,
  changeCurrentPageAC,
  followTC,
  getUsersTC,
  unfollowTC,
} from "../../redux/usersReducer/usersReducer"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../redux/store"
import { useEffect } from "react"
import { Users } from "./Users"
import { Preloader } from "../../components/Preloader/Preloader"

export const UsersContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector<AppRootStateType, UsersPageStateType>((state) => state.usersPage)

  useEffect(() => {
    dispatch(getUsersTC(state.pageSize, state.currentPage))
  }, [])

  const onPageChange = (pageNumber: number) => {
    dispatch(changeCurrentPageAC(pageNumber))
    dispatch(getUsersTC(state.pageSize, pageNumber))
  }

  const follow = (userId: number) => {
    dispatch(followTC(userId))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollowTC(userId))
  }

  return state.isFetching ? (
    <Preloader />
  ) : (
    <Users
      currentPage={state.currentPage}
      follow={follow}
      unfollow={unfollow}
      onPageChange={onPageChange}
      pageSize={state.pageSize}
      totalUsersCount={state.totalUsersCount}
      users={state.users}
      isFollowingInProgress={state.isFollowingInProgress}
    />
  )
}
