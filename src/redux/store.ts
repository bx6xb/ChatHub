import { combineReducers, legacy_createStore, applyMiddleware, Action } from "redux"
import { ProfileReducerAction, profileReducer } from "./profileReducer/profileReducer"
import { DialogsReducerAction, dialogsReducer } from "./dialogsReducer/dialogsReducer"
import { SidebarReducerAction, sidebarReducer } from "./sidebarReducer/sidebarReducer"
import { UsersReducerAction, usersReducer } from "./usersReducer/usersReducer"
import { AuthReducerAction, authReducer } from "./authReducer/authReducer"
import { ThunkAction, ThunkDispatch, thunk as thunkMiddlerware } from "redux-thunk"
import { TypedUseSelectorHook } from "react-redux"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  profile: profileReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunkMiddlerware))

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch: () => ThunkDispatch<AppRootState, unknown, RootAction> = () =>
  useDispatch()

// types
export type AppRootState = ReturnType<typeof rootReducer>
export type AppRootDispatch = typeof store.dispatch
export type RootAction =
  | SidebarReducerAction
  | ProfileReducerAction
  | DialogsReducerAction
  | UsersReducerAction
  | AuthReducerAction
export type Thunk<ActionType extends Action = RootAction> = ThunkAction<
  void,
  AppRootState,
  unknown,
  ActionType
>

// @ts-ignore
window.store = store
