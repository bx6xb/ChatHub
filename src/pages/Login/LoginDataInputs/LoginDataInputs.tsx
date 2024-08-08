import { ControlledInput } from '../../../components/ControlledInput/ControlledInput'
import { Flex } from 'antd'
import s from './LoginDataInputs.module.scss'
import { useAppSelector } from '../../../utils/reduxUtils/reduxUtils'
import { selectCaptchaUrl } from '../../../store/auth/selectors'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { InputData, LoginDataInputsProps } from './types'

export const LoginDataInputs = (props: LoginDataInputsProps) => {
  const { control, errors } = props

  // get data from the state
  const captchaUrl = useAppSelector(selectCaptchaUrl)

  // localization
  const { t } = useTranslation()

  // variables
  const inputData: InputData[] = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      control: control,
      rules: {
        required: true,
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      },
      className: s.input,
      errorMessage:
        errors.email?.type === 'required'
          ? t('Login_email_required')
          : errors.email?.type === 'pattern'
            ? t('Login_email_incorrect')
            : null
    },
    {
      type: 'password',
      name: 'password',
      placeholder: t('Login_password_placeholder'),
      control: control,
      rules: { required: true },
      className: s.input,
      errorMessage:
        errors.password?.type === 'required'
          ? t('Login_password_incorrect')
          : null
    },
    {
      name: 'captcha',
      control: control,
      placeholder: 'Captcha',
      flexWrapper: {
        children: null,
        gap: 3,
        vertical: true
      },
      additionalComponent: <img src={captchaUrl!} alt="captcha" />,
      isHidden: !captchaUrl
    },
    {
      as: 'checkbox',
      type: 'checkbox',
      name: 'rememberMe',
      control: control,
      label: t('Login_remember_me'),
      labelPosition: 'right',
      flexWrapper: {
        children: null,
        gap: 3,
        align: 'center'
      }
    }
  ]

  // jsx variables
  const mappedInputs = inputData.map((data, i) => {
    const {
      flexWrapper,
      additionalComponent,
      isHidden,
      ...controlledInputProps
    } = data

    const ControlledInputComponent = (
      <React.Fragment key={i}>
        {additionalComponent}
        <ControlledInput {...controlledInputProps} />
      </React.Fragment>
    )

    return isHidden ? null : flexWrapper ? (
      <Flex key={i} {...flexWrapper}>
        {ControlledInputComponent}
      </Flex>
    ) : (
      ControlledInputComponent
    )
  })

  return <>{mappedInputs}</>
}
