import { Navigate } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { login } from '../../store/auth/asyncActions'
import { ControlledInput } from '../../components/ControlledInput/ControlledInput'
import s from './Login.module.scss'
import { Button, Flex, Typography } from 'antd'
import { addAppMessage } from '../../store/app/reducer'
import { useTranslation } from 'react-i18next'
import { DataForm } from '../../api/types'
import { v4 } from 'uuid'
import { selectCaptchaUrl, selectIsAuth } from '../../store/auth/selectors'

const createErrorElement = (text: string) => (
  <div className={s.error}>{text}</div>
)

export const Login = () => {
  // get data from the state
  const isAuth = useAppSelector(selectIsAuth)
  const captchaUrl = useAppSelector(selectCaptchaUrl)

  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { t } = useTranslation()

  // form init
  const {
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    control
  } = useForm<DataForm>()

  const onSubmit: SubmitHandler<DataForm> = async data => {
    const action = await dispatch(login(data))
    if (login.fulfilled.match(action)) {
      reset()
      clearErrors()
      dispatch(
        addAppMessage({
          id: v4(),
          isError: false,
          message: t('Login_logged_in')
        })
      )
    }
  }

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Flex justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="start" gap={5} vertical>
          <Typography.Title level={2}>{t('Login_login')}</Typography.Title>
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
          {errors.email?.type === 'required'
            ? createErrorElement(t('Login_email_required'))
            : errors.email?.type === 'pattern'
              ? createErrorElement(t('Login_email_incorrect'))
              : null}

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
          {errors.password?.type === 'required' &&
            createErrorElement(t('Login_password_incorrect'))}

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

          <Button htmlType="submit" className="submitFormButton">
            {t('Login_button')}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
