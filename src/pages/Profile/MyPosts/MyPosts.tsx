import { Flex, Typography } from 'antd'
import { PostsForm } from './PostsForm/PostsForm'
import { Post } from './Post/Post'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import { profileSelectors } from '../../../store/profileReducer'
import { useAppSelector } from '../../../utils/reduxUtils'

export const MyPosts = () => {
  // get data from state
  const posts = useAppSelector(profileSelectors.selectPosts)
  const userPhoto = useAppSelector(profileSelectors.selectPhoto)

  // variables
  let mappedPosts = posts.map(p => (
    <Post key={p.id} post={p} photo={userPhoto || userDefaultPhoto} />
  ))

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={3}>My posts</Typography.Title>
      <PostsForm />
      <Flex vertical gap={12}>
        {mappedPosts}
      </Flex>
    </Flex>
  )
}
