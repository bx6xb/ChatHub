import { useAppDispatch } from "../../store/store"
import { SubmitHandler, useForm } from "react-hook-form"
import { addPost } from "../../store/profileReducer/profileReducer"

export const PostsForm = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostsFormData>()

  const onSubmit: SubmitHandler<PostsFormData> = (data) => {
    dispatch(addPost({ message: data.message }))
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
export type PostsFormData = {
  message: string
}
