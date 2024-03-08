import { AddMessageActionType, UpdateNewMessageTextActionType } from "./dialogsReducer"
import { AddPostActionType, UpdateNewPostTextActionType } from "./profileReducer"

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

export type ActionType =
  | AddPostActionType
  | UpdateNewPostTextActionType
  | AddMessageActionType
  | UpdateNewMessageTextActionType
