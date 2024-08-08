import { ProfileData } from '../../api/types'
import { ControlledInputProps as ControlledInputPropsWithoutGeneric } from '../../components/ControlledInput/ControlledInput'

export type ControlledInputProps =
  ControlledInputPropsWithoutGeneric<ProfileFormData>
export type ProfileFormData = ProfileData & {
  profileStatus: string
  photo: {
    file: {
      uid: string
      lastModified: number
      lastModifiedDate: string
      name: string
      size: number
      type: string
      percent: number
      originFileObj: File
      status: string
    }
  }
}
