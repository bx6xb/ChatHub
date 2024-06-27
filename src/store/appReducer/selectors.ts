import { AppRootState } from "../store"

export const selectIsAppInitialized = (state: AppRootState) => state.app.isAppInitialized
export const selectError = (state: AppRootState) => state.app.error
