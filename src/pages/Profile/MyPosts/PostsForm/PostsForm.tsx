import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { addPost } from '../../../../store/profileReducer/profileReducer'
import { useAppDispatch } from '../../../../utils/reduxUtils'
import { Button, Flex, Input, Space } from 'antd'
import s from './PostsForm.module.scss'

export const PostsForm = () => {
  // dispatch
  const dispatch = useAppDispatch()

  // form init
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<PostsFormData>()

  // controller for custom input
  const {
    field: { value, onChange }
  } = useController({
    name: 'message',
    control,
    rules: {
      maxLength: 100,
      required: true
    }
  })

  // callbacks
  const onSubmit: SubmitHandler<PostsFormData> = data => {
    dispatch(addPost({ message: data.message }))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        {/* input */}
        <Space.Compact className={s.input}>
          <Input onChange={onChange} value={value} placeholder="Message" />
          <Button htmlType="submit">Submit</Button>
        </Space.Compact>

        {/* errors */}
        {errors.message?.type === 'maxLength' && (
          <span>The message must be less than 100 characters</span>
        )}
        {errors.message?.type === 'required' && (
          <span>This field is required</span>
        )}
      </Flex>
    </form>
  )
}

// types
export type PostsFormData = {
  message: string
}
