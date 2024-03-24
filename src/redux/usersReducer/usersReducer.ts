type PhotosType = {
  small: null | string
  large: null | string
}

export type UserType = {
  name: string
  id: number
  uniqueUrlName: null | string
  photos: PhotosType
  status: null | string
  followed: boolean
}

export type UsersPageType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
}

export const initialState: UsersPageType = {
  users: [],
  pageSize: 6,
  totalUsersCount: 28,
  currentPage: 1,
}

type UsersReducerActionType =
  | FollowActionType
  | UnfollowActionType
  | SetUsersActionType
  | ChangePageSizeActionType
  | ChangeTotalUsersCountActionType
  | ChangeCurrentPageActionType

export const usersReducer = (
  state: UsersPageType = initialState,
  action: UsersReducerActionType
): UsersPageType => {
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
    default:
      return state
  }
}

type FollowActionType = ReturnType<typeof followAC>

export const followAC = (userId: number) =>
  ({
    type: "FOLLOW",
    userId,
  } as const)

type UnfollowActionType = ReturnType<typeof unfollowAC>

export const unfollowAC = (userId: number) =>
  ({
    type: "UNFOLLOW",
    userId,
  } as const)

type SetUsersActionType = ReturnType<typeof setUsersAC>

export const setUsersAC = (users: UserType[]) =>
  ({
    type: "SET_USERS",
    users,
  } as const)

type ChangePageSizeActionType = ReturnType<typeof changePageSizeAC>

export const changePageSizeAC = (pageSize: number) =>
  ({
    type: "CHANGE_PAGE_SIZE",
    pageSize,
  } as const)

type ChangeTotalUsersCountActionType = ReturnType<typeof changeTotalUsersCountAC>

export const changeTotalUsersCountAC = (totalUsersCount: number) =>
  ({
    type: "CHANGE_TOTAL_USERS_COUNT",
    totalUsersCount,
  } as const)

type ChangeCurrentPageActionType = ReturnType<typeof changeCurrentPageAC>

export const changeCurrentPageAC = (currentPage: number) =>
  ({
    type: "CHANGE_CURRENT_PAGE",
    currentPage,
  } as const)
