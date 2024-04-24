import axios from "axios"
import { UserDataAuthStateType } from "../redux/authReducer/authReducer"

// types
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

export type UserProfileType = {
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

// axios instance
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
})

// api
export const authAPI = {
  getAuth() {
    return instance.get<ResponseType<UserDataAuthStateType>>("auth/me")
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
    return instance.get<UserProfileType>(`profile/${userId}`)
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
