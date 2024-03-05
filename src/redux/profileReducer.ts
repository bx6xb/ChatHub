import {
  ActionType,
  AddPostActionType,
  ProfilePageType,
  UpdateNewPostTextActionType,
} from "./state"

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 10 },
    { id: 4, message: "Dada", likesCount: 9 },
  ],
  newPostText: "Yan Turnt",
}

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ActionType
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
    default:
      return state
  }
}

export const addPostAC = (): AddPostActionType => ({
  type: "ADD-POST",
})

export const updateNewPostAC = (text: string): UpdateNewPostTextActionType => ({
  type: "UPDATE-NEW-POST-TEXT",
  text,
})
