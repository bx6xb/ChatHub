import { UserProfileType } from "../../pages/Profile/ProfileContainer"

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 10 },
    { id: 4, message: "Dada", likesCount: 9 },
  ],
  newPostText: "Yan Turnt",
  userProfile: null,
}

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ProfileReducerActionType
): ProfilePageType => {
  switch (action.type) {
    case "ADD-POST":
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: state.newPostText,
            likesCount: 0,
          },
          ...state.posts,
        ],
        newPostText: "",
      }
    case "UPDATE-NEW-POST-TEXT":
      return {
        ...state,
        newPostText: action.text,
      }
    case "SET-USER-PROFILE":
      return {
        ...state,
        userProfile: action.userProfile,
      }
    default:
      return state
  }
}

// action creators
export const addPostAC = () =>
  ({
    type: "ADD-POST",
  } as const)
export const updateNewPostAC = (text: string) =>
  ({
    type: "UPDATE-NEW-POST-TEXT",
    text,
  } as const)
export const setUserProfileAC = (userProfile: UserProfileType) =>
  ({
    type: "SET-USER-PROFILE",
    userProfile,
  } as const)

// types
export type PostType = {
  id: number
  message: string
  likesCount: number
}
export type ProfilePageType = {
  posts: PostType[]
  newPostText: string
  userProfile: UserProfileType | null
}
export type ProfileReducerActionType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostAC>
  | ReturnType<typeof setUserProfileAC>
