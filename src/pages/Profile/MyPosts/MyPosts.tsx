import { Flex, Typography } from 'antd'
import { PostsForm } from './PostsForm/PostsForm'
import { Post } from './Post/Post'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import { profileSelectors } from '../../../store/profileReducer'
import { useAppSelector } from '../../../utils/reduxUtils'
import { useTranslation } from 'react-i18next'

export const MyPosts = () => {
  // get data from the state
  const posts = useAppSelector(profileSelectors.selectPosts)
  const userPhoto = useAppSelector(profileSelectors.selectPhoto)

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
