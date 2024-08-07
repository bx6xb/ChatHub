import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { addPost } from '../../../../store/profile/reducer'
import { useAppDispatch } from '../../../../utils/reduxUtils/reduxUtils'
import { Button, Flex, Input, Space } from 'antd'
import s from './PostsForm.module.scss'
import { useTranslation } from 'react-i18next'

type PostsLoginFormData = {
  message: string
}

export const PostsForm = () => {
  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { t } = useTranslation()

  // form init
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<PostsLoginFormData>()

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
  const onSubmit: SubmitHandler<PostsLoginFormData> = data => {
    dispatch(addPost(data.message))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        {/* input */}
        <Space.Compact className={s.input}>
          <Input
            onChange={onChange}
            value={value}
            placeholder={t('PostsForm_post_input_placeholder')}
          />
          <Button htmlType="submit">{t('PostsForm_submit')}</Button>
        </Space.Compact>

        {/* errors */}
        {errors.message?.type === 'maxLength' && (
          <span>{t('PostsForm_max_length_error')}</span>
        )}
        {errors.message?.type === 'required' && (
          <span>{t('PostsForm_required_error')}</span>
        )}
      </Flex>
    </form>
  )
}
