import { AppRootState } from '../store'

export const selectProfileState = (state: AppRootState) => state.profile
export const selectProfileStatus = (state: AppRootState) =>
  state.profile.profileStatus
export const selectPosts = (state: AppRootState) => state.profile.posts
export const selectUserProfile = (state: AppRootState) =>
  state.profile.userProfile
export const selectPhoto = (state: AppRootState) =>
  state.profile.userProfile?.photos.large
export const selectFullName = (state: AppRootState) =>
  state.profile.userProfile?.fullName
export const selectUserId = (state: AppRootState) =>
  state.profile.userProfile?.userId
