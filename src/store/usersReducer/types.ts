import { User } from "../../api/api"

export type UsersPageState = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingInProgress: number[]
}
