import { Thunk } from "../store"
import { followAPI, usersAPI } from "../../api/api"

// initial state
export const initialState: UsersPageState = {
  users: [],
  pageSize: 6,
  totalUsersCount: 28,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
}

// reducer
export const usersReducer = (
  state: UsersPageState = initialState,
  action: UsersReducerAction
): UsersPageState => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: true } : u)),
      }
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: false } : u)),
      }
    case "SET_USERS":
      return {
        ...state,
        users: [...action.users],
      }
    case "CHANGE_PAGE_SIZE":
      return {
        ...state,
        pageSize: action.pageSize,
      }
    case "CHANGE_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    case "CHANGE_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case "CHANGE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case "CHANGE_IS_FOLLOWING_IN_PROGRESS":
      return {
        ...state,
        isFollowingInProgress: action.isFetching
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.userId),
      }
    default:
      return state
  }
}

// actions
export const followAC = (userId: number) =>
  ({
    type: "FOLLOW",
    userId,
  } as const)
export const unfollowAC = (userId: number) =>
  ({
    type: "UNFOLLOW",
    userId,
  } as const)
export const setUsersAC = (users: User[]) =>
  ({
    type: "SET_USERS",
    users,
  } as const)
export const changePageSizeAC = (pageSize: number) =>
  ({
    type: "CHANGE_PAGE_SIZE",
    pageSize,
  } as const)
export const changeTotalUsersCountAC = (totalUsersCount: number) =>
  ({
    type: "CHANGE_TOTAL_USERS_COUNT",
    totalUsersCount,
  } as const)
export const changeCurrentPageAC = (currentPage: number) =>
  ({
    type: "CHANGE_CURRENT_PAGE",
    currentPage,
  } as const)
export const changeIsFetchingAC = (isFetching: boolean) =>
  ({
    type: "CHANGE_IS_FETCHING",
    isFetching,
  } as const)
export const changeIsFollowingInProgressAC = (isFetching: boolean, userId: number) =>
  ({
    type: "CHANGE_IS_FOLLOWING_IN_PROGRESS",
    isFetching,
    userId,
  } as const)

// thunks
export const getUsersTC =
  (pageSize: number, currentPage: number): Thunk =>
  (dispatch) => {
    dispatch(changeIsFetchingAC(true))

    usersAPI
      .getUsers(pageSize, currentPage)
      .then((res) => {
        dispatch(setUsersAC(res.data.items))
        dispatch(changeTotalUsersCountAC(res.data.totalCount))
      })
      .finally(() => dispatch(changeIsFetchingAC(false)))
  }
export const followTC =
  (userId: number): Thunk =>
  (dispatch) => {
    dispatch(changeIsFollowingInProgressAC(true, userId))

    followAPI
      .follow(userId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(followAC(userId))
        }
      })
      .finally(() => dispatch(changeIsFollowingInProgressAC(false, userId)))
  }
export const unfollowTC =
  (userId: number): Thunk =>
  (dispatch) => {
    dispatch(changeIsFollowingInProgressAC(true, userId))

    followAPI
      .unfollow(userId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(unfollowAC(userId))
        }
      })
      .finally(() => dispatch(changeIsFollowingInProgressAC(false, userId)))
  }

// types
type Photos = {
  small: null | string
  large: null | string
}
export type User = {
  name: string
  id: number
  uniqueUrlName: null | string
  photos: Photos
  status: null | string
  followed: boolean
}
export type UsersPageState = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingInProgress: number[]
}
export type UsersReducerAction =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof changePageSizeAC>
  | ReturnType<typeof changeTotalUsersCountAC>
  | ReturnType<typeof changeCurrentPageAC>
  | ReturnType<typeof changeIsFetchingAC>
  | ReturnType<typeof changeIsFollowingInProgressAC>
