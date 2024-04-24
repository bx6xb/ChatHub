import { combineReducers, legacy_createStore, applyMiddleware } from "redux"
import { profileReducer } from "./profileReducer/profileReducer"
import { dialogsReducer } from "./dialogsReducer/dialogsReducer"
import { sidebarReducer } from "./sidebarReducer/sidebarReducer"
import { UsersReducerActionType, usersReducer } from "./usersReducer/usersReducer"
import { authReducer } from "./authReducer/authReducer"
import { ThunkAction, thunk as thunkMiddlerware } from "redux-thunk"

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunkMiddlerware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type DispatchType = typeof store.dispatch

export type RootActionType = UsersReducerActionType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, RootActionType>

// @ts-ignore
window.store = store
