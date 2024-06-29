import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/redexUtils"
import { usersSelectors } from "../../store/usersReducer"
import { follow, getUsers, unfollow } from "../../store/usersReducer/asyncActions"

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { pageSize, totalUsersCount, currentPage, isFollowingInProgress, isFetching, users } =
    useAppSelector(usersSelectors.selectUsersState)

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
