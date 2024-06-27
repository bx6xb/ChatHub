import { AppRootState } from "../store"

export const selectUsers = (state: AppRootState) => state.sidebar.users
