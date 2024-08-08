import { Control, FieldErrors } from 'react-hook-form'
import { LoginFormData } from '../../../api/types'
import { FlexProps } from 'antd'
import { ControlledInputProps } from '../../../components/ControlledInput/ControlledInput'

export type LoginDataInputsProps = {
  control: Control<LoginFormData>
  errors: FieldErrors
}
export type InputData = ControlledInputProps<LoginFormData> & {
  flexWrapper?: FlexProps
  additionalComponent?: React.ReactNode
  isHidden?: boolean
}
