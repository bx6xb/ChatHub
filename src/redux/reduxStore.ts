import { Store, combineReducers, legacy_createStore } from "redux"
import { profileReducer } from "./profileReducer"
import { dialogsReducer } from "./dialogsReducer"
import { sidebarReducer } from "./sidebarReducer"
import { DialogsPageType, ProfilePageType, SidebarType } from "./state"

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export type StoreType = Store<
  { profilePage: ProfilePageType; dialogsPage: DialogsPageType; sidebar: SidebarType },
  any,
  unknown
>

export const store = legacy_createStore(rootReducer)
