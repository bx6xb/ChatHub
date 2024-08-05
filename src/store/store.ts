import { combineReducers } from 'redux'
import { profileReducer } from './profile/reducer'
import { sidebarReducer } from './sidebar/reducer'
import { usersReducer } from './users/reducer'
import { authReducer } from './auth/reducer'
import { thunk } from 'redux-thunk'
import { appReducer } from './app/reducer'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  profile: profileReducer,
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
