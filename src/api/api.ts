import axios from "axios"

// axios instance
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})

// api
export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDataDomain>>("auth/me")
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
  setProfileData(profileData: ProfileData) {
    return instance.put<ResponseType>("profile", profileData)
  },
  getUserProfile(userId: number) {
    return instance.get<ProfileDomain>(`profile/${userId}`)
  },
  getProfileStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
  },
  setProfileStatus(status: string) {
    return instance.put<ResponseType>("profile/status", { status })
  },
  setProfilePhoto(photo: File) {
    const formData = new FormData()
    formData.append("image", photo)
    return instance.put<ResponseType<{ photos: Photos }>>("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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
export const securityAPI = {
  getCaptcha() {
    return instance.get<{ url: string }>("security/get-captcha-url")
  },
}

// types
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: { field: FormFields; error: string }[]
  data: D
}
export type Photos = {
  large: string | null
  small: string | null
}
export type Contacts = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
}
export type ProfileData = {
  aboutMe: string | null
  contacts: Contacts
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  userId: number
}
export type ProfileDataValues = keyof ProfileData
export type ProfileDomain = ProfileData & {
  photos: Photos
}
export type UserDataDomain = {
  id: number
  email: string
  login: string
}
export interface FormData {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}
export type FormFields = keyof FormData
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
