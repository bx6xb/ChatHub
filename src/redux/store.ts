import { combineReducers, legacy_createStore } from "redux"
import { profileReducer } from "./profileReducer/profileReducer"
import { dialogsReducer } from "./dialogsReducer/dialogsReducer"
import { sidebarReducer } from "./sidebarReducer/sidebarReducer"
import { usersReducer } from "./usersReducer/usersReducer"
import { authReducer } from "./authReducer/authReducer"

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type DispatchType = typeof store.dispatch

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store
