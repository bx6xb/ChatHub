import { combineReducers, legacy_createStore } from "redux"
import { profileReducer } from "./profileReducer"
import { dialogsReducer } from "./dialogsReducer"
import { sidebarReducer } from "./sidebarReducer"

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type DispatchType = typeof store.dispatch

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store

// question
export type StoreType = typeof store
