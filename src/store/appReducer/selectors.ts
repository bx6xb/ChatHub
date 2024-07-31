import { AppRootState } from '../store'

export const selectIsAppInitialized = (state: AppRootState) =>
  state.app.isAppInitialized
export const selectIsError = (state: AppRootState) => state.app.isError
export const selectAppMessage = (state: AppRootState) => state.app.appMessage
