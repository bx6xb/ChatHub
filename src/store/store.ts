import { combineReducers, AnyAction } from "redux"
import { ProfileReducerAction, profileReducer } from "./profileReducer/profileReducer"
import { DialogsReducerAction, dialogsReducer } from "./dialogsReducer/dialogsReducer"
import { SidebarReducerAction, sidebarReducer } from "./sidebarReducer/sidebarReducer"
import { UsersReducerAction, usersReducer } from "./usersReducer/usersReducer"
import { authReducer } from "./authReducer/authReducer"
import { ThunkDispatch, thunk } from "redux-thunk"
import { TypedUseSelectorHook } from "react-redux"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { appReducer } from "./appReducer/appReducer"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  profile: profileReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch: () => ThunkDispatch<AppRootState, unknown, AnyAction> = () =>
  useDispatch()

// types
export type AppRootState = ReturnType<typeof rootReducer>
export type AppRootDispatch = typeof store.dispatch
export type RootAction =
  | SidebarReducerAction
  | ProfileReducerAction
  | DialogsReducerAction
  | UsersReducerAction
