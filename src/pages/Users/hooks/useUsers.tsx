import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { getUsers } from "../../../redux/usersReducer/usersReducer"
import s from "../Users.module.css"

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
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      <span
        onClick={() => onPageChange(i)}
        key={i}
        className={currentPage === i ? s.selectedPage : ""}
        style={{ marginRight: "4px" }}
      >
        {i}
      </span>
    )
  }

  return { pages, users, isFollowingInProgress, follow, unfollow, isFetching }
}
