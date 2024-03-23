import { combineReducers, legacy_createStore } from "redux"
import { profileReducer } from "./profileReducer/profileReducer"
import { dialogsReducer } from "./dialogsReducer/dialogsReducer"
import { sidebarReducer } from "./sidebarReducer/sidebarReducer"
import { usersReducer } from "./usersReducer/usersReducer"

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type DispatchType = typeof store.dispatch

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store
