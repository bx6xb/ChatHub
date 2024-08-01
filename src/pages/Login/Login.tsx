import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/reduxUtils'
import { authSelectors } from '../../store/authReducer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormData } from '../../api/api'
import { login } from '../../store/authReducer/asyncActions'
import { ControlledInput } from '../../components/ControlledInput/ControlledInput'
import s from './Login.module.scss'
import { Button, Flex, Typography } from 'antd'
import { setAppMessage } from '../../store/appReducer/appReducer'

const createErrorElement = (text: string) => (
  <div className={s.error}>{text}</div>
)

export const Login = () => {
  // get data from the state
  const isAuth = useAppSelector(authSelectors.selectIsAuth)
  const captchaUrl = useAppSelector(authSelectors.selectCaptchaUrl)

  // dispatch
  const dispatch = useAppDispatch()

  // form init
  const {
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    control
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async data => {
    const action = await dispatch(login(data))
    if (login.fulfilled.match(action)) {
      reset()
      clearErrors()
      dispatch(setAppMessage('You are successfully logged in!'))
    }
  }

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Flex justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="start" gap={5} vertical>
          <Typography.Title level={2}>Login</Typography.Title>
          {/* Email input */}
          <ControlledInput
            type="email"
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            }}
            className={s.input}
          />
          {/* Email error */}
          {errors.email?.type === 'required'
            ? createErrorElement('Email is required')
            : errors.email?.type === 'pattern'
              ? createErrorElement('Email is incorrect')
              : null}

          {/* Password input */}
          <ControlledInput
            type="password"
            name="password"
            placeholder="Password"
            control={control}
            rules={{ required: true }}
            className={s.input}
          />
          {/* Password error */}
          {errors.password?.type === 'required' &&
            createErrorElement('Password is required')}

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
              label="Remember me"
              labelPosition="right"
            />
          </Flex>

          <Button htmlType="submit" className="submitFormButton">
            Login
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
