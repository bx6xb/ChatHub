import { AppRootState } from '../store'

export const selectIsAppInitialized = (state: AppRootState) =>
  state.app.isAppInitialized
export const selectAppMessages = (state: AppRootState) => state.app.appMessages
