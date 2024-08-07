export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: { field: LoginFormDataFields; error: string }[]
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
export type ContactValues = keyof Contacts
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
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}
export type LoginFormDataFields = keyof LoginFormData
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
