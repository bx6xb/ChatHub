import {
  Button,
  Checkbox,
  CheckboxProps,
  Input,
  InputProps,
  Upload,
  UploadProps
} from 'antd'
import { useId } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './ControlledInput.module.scss'
import { UploadOutlined } from '@ant-design/icons'

type WithoutValueAndOnChange<T> = Omit<T, 'onChange' | 'value'>

export type ControlledInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    (
      | WithoutValueAndOnChange<InputProps>
      | WithoutValueAndOnChange<CheckboxProps>
      | WithoutValueAndOnChange<UploadProps>
    ) & {
      as?: 'input' | 'checkbox' | 'upload'
      label?: string
      labelPosition?: 'left' | 'right'
      uploadButtonText?: string
    }

type ComponentProps = {
  onChange?: (e: any) => void
  value?: any
  checked?: boolean
  [key: string]: any
}

export const ControlledInput = <TFieldValues extends FieldValues>(
  props: ControlledInputProps<TFieldValues>
) => {
  const {
    as,
    label,
    labelPosition,
    name,
    control,
    rules,
    defaultValue,
    disabled,
    shouldUnregister,
    uploadButtonText,
    ...rest
  } = props

  // create id
  const id = useId()

  // controller for custom inputs
  const {
    field: { value, onChange }
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    disabled,
    shouldUnregister
  })

  // create component props object
  const ComponentProps: ComponentProps = {
    [as === 'checkbox' ? 'checked' : 'value']: value,
    onChange,
    ...rest
  }

  if (as === 'upload') {
    delete ComponentProps.value
  }

  return (
    <>
      {/* left label */}
      {label &&
        labelPosition !== 'right' && ( // for default positioning if label exists
          <label htmlFor={id} className={s.label}>
            {label}
          </label>
        )}

      {as === 'checkbox' ? (
        // checkbox
        <Checkbox {...ComponentProps} id={id} />
      ) : as === 'upload' ? (
        // upload
        <Upload {...ComponentProps} id={id}>
          <Button icon={<UploadOutlined />}>{uploadButtonText}</Button>
        </Upload>
      ) : (
        // input
        <Input {...ComponentProps} id={id} />
      )}

      {/* right label */}
      {label && labelPosition === 'right' && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}
    </>
  )
}
