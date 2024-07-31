import { Checkbox, Input, InputProps } from 'antd'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type ControlledInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<InputProps, 'onChange' | 'value'> & {
      as?: 'input' | 'checkbox'
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
    name,
    control,
    rules,
    defaultValue,
    disabled,
    shouldUnregister,
    ...rest
  } = props

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

  const Component = as ? components[as] : Input // choose component

  const ComponentProps = {
    [as === 'checkbox' ? 'checked' : 'value']: value,
    onChange,
    ...rest
  } // create component props object

  return <Component {...ComponentProps} />
}
