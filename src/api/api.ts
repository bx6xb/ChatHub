import axios from 'axios'
import {
  LoginFormData,
  GetUsersResponse,
  Photos,
  ProfileData,
  ProfileDomain,
  ResponseType,
  UserDataDomain
} from './types'

// axios instance
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY
  }
})

// api
export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDataDomain>>('auth/me')
  },
  login(formData: LoginFormData) {
    return instance.post<ResponseType<{ userId: number }>>(
      'auth/login',
      formData
    )
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  }
}
export const usersAPI = {
  getUsers(count?: number, page?: number, term?: string, friend?: boolean) {
    const queryParams = {
      count,
      page,
      term,
      friend
    }
    const queryParamsString = Object.entries(queryParams)
      .map(p => (p[1] ? p.join('=') : ''))
      .filter(s => s)
      .join('&')
    return instance.get<GetUsersResponse>(`users?${queryParamsString}`)
  }
}
export const profileAPI = {
  setProfileData(profileData: ProfileData) {
    return instance.put<ResponseType>('profile', profileData)
  },
  getUserProfile(userId: number) {
    return instance.get<ProfileDomain>(`profile/${userId}`)
  },
  getProfileStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
  },
  setProfileStatus(status: string) {
    return instance.put<ResponseType>('profile/status', { status })
  },
  setProfilePhoto(photo: File) {
    const formData = new FormData()
    formData.append('image', photo)
    return instance.put<ResponseType<{ photos: Photos }>>(
      'profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}
export const followAPI = {
  follow(userId: string | number) {
    return instance.post<ResponseType>(`follow/${userId}`)
  },
  unfollow(userId: string | number) {
    return instance.delete<ResponseType>(`follow/${userId}`)
  }
}
export const securityAPI = {
  getCaptcha() {
    return instance.get<{ url: string }>('security/get-captcha-url')
  }
}
