import { AppRootState } from "../store"

export const selectProfileState = (state: AppRootState) => state.profile
export const selectPosts = (state: AppRootState) => state.profile.posts
