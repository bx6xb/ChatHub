import { FormData } from "../../../api/api"
import s from "./LoginForm.module.css"
import { SubmitHandler, useForm } from "react-hook-form"
import { login } from "../../../store/authReducer/authReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"

export const LoginForm = () => {
  const captchaUrl = useAppSelector((state) => state.auth.captchaUrl)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const action = await dispatch(login(data))
    if (login.rejected.match(action) && action.payload) {
      console.log(action.payload)
      setError(action.payload.field, { message: action.payload.error })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("email", { required: "Email is required" })} placeholder="Email" />
        {<div className={s.error}>{errors.email?.message}</div>}
      </div>
      <div>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
        />
        {<div className={s.error}>{errors.password?.message}</div>}
      </div>
      <div>
        <label>
          <input type="checkbox" {...register("rememberMe")} /> Remember me
        </label>
      </div>
      {captchaUrl && (
        <div>
          <img src={captchaUrl} alt="captcha" />
          <input {...register("captcha")} />
        </div>
      )}
      {<div className={s.error}>{errors.captcha?.message}</div>}
      <button type="submit">Login</button>
    </form>
  )
}
