import {
  DialogsPageStateType,
  DialogsReducerActionType,
  dialogsReducer,
} from "./dialogsReducer/dialogsReducer"
import {
  ProfilePageStateType,
  ProfileReducerActionType,
  profileReducer,
} from "./profileReducer/profileReducer"
import { sidebarReducer } from "./sidebarReducer/sidebarReducer"

export type FriendsType = {
  id: number
  name: string
}

export type SidebarType = {
  friends: FriendsType[]
}

export type ObserverType = (store: StoreType) => void

export type StateType = {
  profilePage: ProfilePageStateType
  dialogsPage: DialogsPageStateType
  sidebar: SidebarType
}

export type ActionType = ProfileReducerActionType | DialogsReducerActionType

export type StoreType = {
  _state: ReturnType<typeof store.getState>
  _subscriber: ObserverType
  getState: () => StateType
  subscribe: (observer: ObserverType) => void
  dispatch: (action: ActionType) => void
}

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
      userProfile: null,
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
    // this._state.profilePage = profileReducer(this._state.profilePage, action)
    // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    // this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._subscriber(this)
  },
}
