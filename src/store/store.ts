import { combineReducers, AnyAction } from 'redux'
import { profileReducer } from './profileReducer/profileReducer'
import { dialogsReducer } from './dialogsReducer/dialogsReducer'
import { sidebarReducer } from './sidebarReducer/sidebarReducer'
import { usersReducer } from './usersReducer/usersReducer'
import { authReducer } from './authReducer/authReducer'
import { thunk } from 'redux-thunk'
import { appReducer } from './appReducer/appReducer'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  profile: profileReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// types
export type AppRootState = ReturnType<typeof rootReducer>
export type AppRootDispatch = typeof store.dispatch
