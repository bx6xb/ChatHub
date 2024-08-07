import { Control, FieldErrors } from 'react-hook-form'
import { ControlledInput } from '../../../components/ControlledInput/ControlledInput'
import { LoginFormData } from '../../../api/types'
import { ErrorElement } from './ErrorElement/ErrorElement'
import { Flex } from 'antd'
import s from './LoginDataInputs.module.scss'
import { useAppSelector } from '../../../utils/reduxUtils/reduxUtils'
import { selectCaptchaUrl } from '../../../store/auth/selectors'
import { t } from 'i18next'

type LoginDataInputsProps = {
  control: Control<LoginFormData>
  errors: FieldErrors
}

export const LoginDataInputs = (props: LoginDataInputsProps) => {
  const { control, errors } = props

  // get data from the state
  const captchaUrl = useAppSelector(selectCaptchaUrl)

  return (
    <>
      {/* Email input */}
      <ControlledInput
        type="email"
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: true,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        }}
        className={s.input}
      />
      {/* Email error */}
      {errors.email?.type === 'required' ? (
        <ErrorElement text={t('Login_email_required')} />
      ) : errors.email?.type === 'pattern' ? (
        <ErrorElement text={t('Login_email_incorrect')} />
      ) : null}

      {/* Password input */}
      <ControlledInput
        type="password"
        name="password"
        placeholder={t('Login_password_placeholder')}
        control={control}
        rules={{ required: true }}
        className={s.input}
      />
      {/* Password error */}
      {errors.password?.type === 'required' && (
        <ErrorElement text={t('Login_password_incorrect')} />
      )}

      {/* Captcha input */}
      {captchaUrl && (
        <Flex gap={3} vertical>
          <img src={captchaUrl} alt="captcha" />
          <ControlledInput
            name="captcha"
            control={control}
            placeholder="Captcha"
          />
        </Flex>
      )}

      {/* Remember me checkbox */}
      <Flex gap={3} align="center">
        <ControlledInput
          as="checkbox"
          type="checkbox"
          name="rememberMe"
          control={control}
          label={t('Login_remember_me')}
          labelPosition="right"
        />
      </Flex>
    </>
  )
}
