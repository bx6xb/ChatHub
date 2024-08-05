import { Flex, Typography } from 'antd'
import { PostsForm } from './PostsForm/PostsForm'
import { Post } from './Post/Post'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import { useAppSelector } from '../../../utils/reduxUtils/reduxUtils'
import { useTranslation } from 'react-i18next'
import { selectPhoto, selectPosts } from '../../../store/profile/selectors'

export const MyPosts = () => {
  // get data from the state
  const posts = useAppSelector(selectPosts)
  const userPhoto = useAppSelector(selectPhoto)

  // localization
  const { t } = useTranslation()

  // jsx variables
  let mappedPosts = posts.map(p => (
    <Post key={p.id} post={p} photo={userPhoto || userDefaultPhoto} />
  ))

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={3}>{t('MyPosts_posts')}</Typography.Title>
      <PostsForm />
      <Flex vertical gap={12}>
        {mappedPosts}
      </Flex>
    </Flex>
  )
}
