import {
  ActionType,
  AddPostActionType,
  ProfilePageType,
  UpdateNewPostTextActionType,
} from "./state"

export const profileReducer = (state: ProfilePageType, action: ActionType): ProfilePageType => {
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
