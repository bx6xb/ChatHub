import { AppRootState } from '../store'

export const selectUsersState = (state: AppRootState) => state.users
export const selectIsFollowingInProgress = (state: AppRootState) =>
  state.users.isFollowingInProgress
