import { combineReducers, Action, AnyAction } from "redux"
import { ProfileReducerAction, profileReducer } from "./profileReducer/profileReducer"
import { DialogsReducerAction, dialogsReducer } from "./dialogsReducer/dialogsReducer"
import { SidebarReducerAction, sidebarReducer } from "./sidebarReducer/sidebarReducer"
import { UsersReducerAction, usersReducer } from "./usersReducer/usersReducer"
import { authReducer } from "./authReducer/authReducer"
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk"
import { TypedUseSelectorHook } from "react-redux"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { reducer as formReducer } from "redux-form"
import { appReducer } from "./appReducer/appReducer"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  profile: profileReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  auth: authReducer,
  form: formReducer,
})

export const store = configureStore({
  reducer: {
    app: appReducer,
    sidebar: sidebarReducer,
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
  },
  // @ts-ignore
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
export type Thunk<ActionType extends Action = RootAction, Return = void> = ThunkAction<
  Return,
  AppRootState,
  unknown,
  ActionType
> // remove this type
