import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/redexUtils'
import { authSelectors } from '../../store/authReducer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormData } from '../../api/api'
import { login } from '../../store/authReducer/asyncActions'
import { ControlledInput } from '../../components/ControlledInput/ControlledInput'
import s from './Login.module.scss'
import { Button, Flex, Typography } from 'antd'

const Login = () => {
  const isAuth = useAppSelector(authSelectors.selectIsAuth)
  const captchaUrl = useAppSelector(authSelectors.selectCaptchaUrl)

  const dispatch = useAppDispatch()
  const {
    register,
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
    }
  }

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex align="start" gap={5} vertical>
        <Typography.Title level={2}>Login</Typography.Title>
        <ControlledInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
          }}
          className={s.input}
        />
        {<div className={s.error}>{errors.email?.message}</div>}
        <ControlledInput
          type="password"
          name="password"
          placeholder="Password"
          control={control}
          rules={{ required: 'Password is required' }}
          className={s.input}
        />
        {<div className={s.error}>{errors.password?.message}</div>}
        <label>
          <Flex gap={3}>
            <ControlledInput
              as="checkbox"
              type="checkbox"
              name="rememberMe"
              control={control}
            />
            <Typography.Paragraph>Remember me</Typography.Paragraph>
          </Flex>
        </label>
        {captchaUrl && (
          <Flex align="center" gap={3}>
            <img src={captchaUrl} alt="captcha" />
            <input {...register('captcha')} />
          </Flex>
        )}
        {<div className={s.error}>{errors.captcha?.message}</div>}
        <Button htmlType="submit">Login</Button>
      </Flex>
    </form>
  )
}

export default Login
