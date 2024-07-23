import { ProfileDomain } from '../../api/api'

export type PostData = {
  message: string
  likesCount: number
  dislikesCount: number
}
export type Post = {
  id: number
} & PostData
export type ProfileState = {
  posts: Post[]
  userProfile: ProfileDomain | null
  profileStatus: string
}
