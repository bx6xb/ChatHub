import axios from "axios"
import { UserDataAuthState } from "../redux/authReducer/authReducer"

// axios instance
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "0f10c672-c4d1-4613-be30-bf57a61f45f5",
  },
})

// api
export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDataAuthState>>("auth/me")
  },
}
export const usersAPI = {
  getUsers(count?: number, page?: number, term?: string, friend?: boolean) {
    const queryParams = {
      count,
      page,
      term,
      friend,
    }
    const queryParamsString = Object.entries(queryParams)
      .map((p) => (p[1] ? p.join("=") : ""))
      .filter((s) => s)
      .join("&")
    return instance.get(`users?${queryParamsString}`)
  },
}
export const profileAPI = {
  getUserProfile(userId: string | number) {
    return instance.get<UserProfile>(`profile/${userId}`)
  },
  getUserStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
  },
  setUserStatus(status: string) {
    return instance.put<ResponseType>("profile/status", { status })
  },
}
export const followAPI = {
  follow(userId: string | number) {
    return instance.post<ResponseType>(`follow/${userId}`)
  },
  unfollow(userId: string | number) {
    return instance.delete<ResponseType>(`follow/${userId}`)
  },
}

// types
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}
export type UserProfile = {
  aboutMe: string | null
  contacts: {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
  }
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  userId: number
  photos: {
    small: string | null
    large: string | null
  }
} | null
export type UserDataAuthDomain = {
  id: number | null
  email: string | null
  login: string | null
}
