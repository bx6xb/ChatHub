import axios from "axios"

type PhotosType = {
  small: null | string
  large: null | string
}

export type UserType = {
  name: string
  id: number
  photos: PhotosType
  status: string | null
  followed: boolean
}

export type UsersPageType = {
  users: UserType[]
}

export const initialState: UsersPageType = {
  users: [
    // {
    //   id: 1,
    //   fullname: "Yan",
    //   status: "Stay turnt",
    //   followed: true,
    //   photoUrl: "https://avatar.iran.liara.run/public",
    //   location: {
    //     city: "Almaty",
    //     country: "Kazakhstan",
    //   },
    // },
    // {
    //   id: 2,
    //   fullname: "Pasha",
    //   status: "Ahahaha gabar",
    //   followed: false,
    //   photoUrl: "https://avatar.iran.liara.run/public",
    //   location: {
    //     city: "Moscow",
    //     country: "Russia",
    //   },
    // },
    // {
    //   id: 3,
    //   fullname: "Firdavs",
    //   status: "Go v mechet",
    //   followed: false,
    //   photoUrl: "https://avatar.iran.liara.run/public",
    //   location: {
    //     city: "Dushanbe",
    //     country: "Tajikistan",
    //   },
    // },
  ],
}

type UsersReducerActionType = FollowActionType | UnfollowActionType | SetUsersActionType

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
        users: [...state.users, ...action.users],
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
