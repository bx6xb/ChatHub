import { ProfileData } from '../../api/types'
import { ControlledInputProps as ControlledInputPropsWithoutGeneric } from '../../components/ControlledInput/ControlledInput'

export type ControlledInputProps =
  ControlledInputPropsWithoutGeneric<FormValues>
export type FormValues = ProfileData & {
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
