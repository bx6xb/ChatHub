import { Navigate } from 'react-router-dom'
import { Button, Flex, Typography } from 'antd'
import { LoginDataInputs } from './LoginDataInputs/LoginDataInputs'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import { selectIsAuth } from '../../store/auth/selectors'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormData } from '../../api/types'
import { login } from '../../store/auth/asyncActions'
import { addAppMessage } from '../../store/app/reducer'
import { v4 } from 'uuid'
import { t } from 'i18next'

const Login = () => {
  // get data from the state
  const isAuth = useAppSelector(selectIsAuth)

  // dispatch
  const dispatch = useAppDispatch()

  // form init
  const {
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    control
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async data => {
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

  // redirect
  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Flex justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="start" gap={5} vertical>
          <Typography.Title level={2}>{t('Login_login')}</Typography.Title>

          {/* inputs */}
          <LoginDataInputs control={control} errors={errors} />

          <Button htmlType="submit" className="submitFormButton">
            {t('Login_button')}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default Login
