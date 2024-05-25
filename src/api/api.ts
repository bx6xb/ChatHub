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
  login(formData: FormData) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", formData)
  },
  logout() {
    return instance.delete<ResponseType>("auth/login")
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
    return instance.get<GetUsersResponse>(`users?${queryParamsString}`)
  },
}
export const profileAPI = {
  getUserProfile(userId: string | number) {
    return instance.get<Profile>(`profile/${userId}`)
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
export type Photos = {
  small: string | null
  large: string | null
}
export type Profile = {
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
  photos: Photos
}
export type UserDataAuthDomain = {
  id: number | null
  email: string | null
  login: string | null
}
export type FormData = {
  login: string
  password: string
  rememberMe: boolean
}
export type User = {
  name: string
  id: number
  photos: Photos
  status: string | null
  followed: boolean
}
export type GetUsersResponse = {
  items: User[]
  totalCount: number
  error: string | null
}
