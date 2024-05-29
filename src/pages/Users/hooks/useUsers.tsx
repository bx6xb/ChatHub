import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { getUsers, follow, unfollow } from "../../../redux/usersReducer/usersReducer"

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { pageSize, totalUsersCount, currentPage, isFollowingInProgress, isFetching, users } =
    useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers({ pageSize, currentPage }))
  }, [])

  const onPageChange = (pageNumber: number) => {
    dispatch(getUsers({ pageSize, currentPage: pageNumber }))
  }
  const followOnClick = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowOnClick = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return {
    currentPage,
    totalUsersCount,
    pageSize,
    users,
    isFollowingInProgress,
    followOnClick,
    unfollowOnClick,
    onPageChange,
    isFetching,
  }
}
