import { dialogsReducer } from "./dialogsReducer"
import { profileReducer } from "./profileReducer"
import { sidebarReducer } from "./sidebarReducer"

export type FriendsType = {
  id: number
  name: string
}

export type SidebarType = {
  friends: FriendsType[]
}

export type MessageType = {
  id: number
  message: string
}

export type DialogType = {
  id: number
  name: string
}

export type DialogsPageType = {
  dialogs: DialogType[]
  messages: MessageType[]
  newMessageText: string
}

export type PostType = {
  id: number
  message: string
  likesCount: number
}

export type ProfilePageType = {
  posts: PostType[]
  newPostText: string
}

export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
}

export type ObserverType = (store: StoreType) => void

export type StoreType = {
  _state: StateType
  _subscriber: ObserverType
  getState: () => StateType
  subscribe: (observer: ObserverType) => void
  dispatch: (action: ActionType) => void
}

export type AddPostActionType = {
  type: "ADD-POST"
}

export type UpdateNewPostTextActionType = {
  type: "UPDATE-NEW-POST-TEXT"
  text: string
}

export type AddMessageActionType = {
  type: "ADD-MESSAGE"
}

export type UpdateNewMessageTextActionType = {
  type: "UPDATE-NEW-MESSAGE-TEXT"
  text: string
}

export type ActionType =
  | AddPostActionType
  | UpdateNewPostTextActionType
  | AddMessageActionType
  | UpdateNewMessageTextActionType

export const store: StoreType = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 },
        { id: 3, message: "Blabla", likesCount: 10 },
        { id: 4, message: "Dada", likesCount: 9 },
      ],
      newPostText: "Yan Turnt",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Yan" },
        { id: 2, name: "Veronika" },
        { id: 3, name: "Sanya" },
        { id: 4, name: "Firdavs" },
        { id: 5, name: "Denis" },
        { id: 6, name: "Tolik" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your it-kamasutra?" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
        { id: 6, message: "Yo!" },
      ],
      newMessageText: "Zenow Turnt",
    },
    sidebar: {
      friends: [
        {
          id: 1,
          name: "Yan",
        },
        {
          id: 2,
          name: "Veronika",
        },
        {
          id: 3,
          name: "Sasha",
        },
      ],
    },
  },

  _subscriber: () => {},

  getState() {
    return this._state
  },

  subscribe(observer: (store: StoreType) => void) {
    this._subscriber = observer
  },

  dispatch(action: ActionType) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._subscriber(this)
  },
}
