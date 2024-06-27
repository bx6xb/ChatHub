import { ProfileDomain } from "../../api/api"

export type Post = {
  id: number
  message: string
  likesCount: number
}
export type ProfileState = {
  posts: Post[]
  userProfile: ProfileDomain | null
  profileStatus: string
}
