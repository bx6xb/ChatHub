import { ProfileDomain } from '../../api/types'

export type PostData = {
  message: string
  likesCount: number
  dislikesCount: number
}
export type Post = {
  id: string
} & PostData
export type ProfileState = {
  posts: Post[]
  userProfile: ProfileDomain | null
  profileStatus: string
}
