import { User } from '../../api/types'

export type UsersPageState = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingInProgress: number[]
}
export type GetUsersReturn = {
  users: User[]
  totalCount: number
  currentPage: number
}
export type GetUsersArgs = { pageSize: number; currentPage: number }
