import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch } from "../../store/store"
import { addMessage } from "../../store/dialogsReducer/dialogsReducer"

export const DialogsForm = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DialogsFormData>()

  const onSubmit: SubmitHandler<DialogsFormData> = (data) => {
    dispatch(addMessage({ message: data.message }))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("message", { required: true, maxLength: 10 })} placeholder="Message" />
      {errors.message?.type === "maxLength" && (
        <span>The message must be less than 10 characters</span>
      )}
      {errors.message?.type === "required" && <span>This field is required</span>}

      <button type="submit">Submit</button>
    </form>
  )
}

// types
export type DialogsFormData = {
  message: string
}
