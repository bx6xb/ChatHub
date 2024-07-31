import { Checkbox, Input, InputProps } from 'antd'
import { useId } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './ControlledInput.module.scss'

type ControlledInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<InputProps, 'onChange' | 'value'> & {
      as?: keyof typeof components
      label?: string
      labelPosition?: 'left' | 'right'
    }

const components = {
  input: Input,
  checkbox: Checkbox
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

  // choose component
  const Component = as ? components[as] : Input

  // create component props object
  const ComponentProps = {
    [as === 'checkbox' ? 'checked' : 'value']: value,
    onChange,
    ...rest
  }

  return (
    <>
      {
        // for default positioning if label exists
        label && labelPosition !== 'right' && (
          <label htmlFor={id} className={s.label}>
            {label}
          </label>
        )
      }
      <Component {...ComponentProps} id={id} />
      {label && labelPosition === 'right' && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}
    </>
  )
}
