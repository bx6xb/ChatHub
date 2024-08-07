import { Flex, Typography } from 'antd'
import { PostsForm } from './PostsForm/PostsForm'
import { Post } from './Post/Post'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import {
  useAppDispatch,
  useAppSelector
} from '../../../utils/reduxUtils/reduxUtils'
import { selectPhoto, selectPosts } from '../../../store/profile/selectors'
import { useEffect } from 'react'
import { generatePosts } from '../../../store/profile/reducer'
import { Languages } from '../../../utils/randomData/getRandomPosts'
import { useTranslation } from 'react-i18next'

export const MyPosts = () => {
  // get data from the state
  const posts = useAppSelector(selectPosts)
  const userPhoto = useAppSelector(selectPhoto)

  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { t, i18n } = useTranslation()

  useEffect(() => {
    dispatch(generatePosts(i18n.language as Languages))
  }, []) // generate posts

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
