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

export type UsersPageStateType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
}

export const initialState: UsersPageStateType = {
  users: [],
  pageSize: 6,
  totalUsersCount: 28,
  currentPage: 1,
  isFetching: false,
}

type UsersReducerActionType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof changePageSizeAC>
  | ReturnType<typeof changeTotalUsersCountAC>
  | ReturnType<typeof changeCurrentPageAC>
  | ReturnType<typeof changeIsFetchingAC>

export const usersReducer = (
  state: UsersPageStateType = initialState,
  action: UsersReducerActionType
): UsersPageStateType => {
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
    default:
      return state
  }
}

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

export const setUsersAC = (users: UserType[]) =>
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
