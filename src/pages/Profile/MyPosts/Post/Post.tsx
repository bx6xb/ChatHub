import s from './Post.module.scss'
import { Post as PostType } from '../../../../store/profile/types'
import {
  DeleteOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined
} from '@ant-design/icons'
import { Avatar, Flex, Typography } from 'antd'
import { usePost } from './usePost'

type PostProps = {
  post: PostType
  photo: string
}

export const Post = ({ post, photo }: PostProps) => {
  const {
    message,
    isLike,
    toggleLike,
    likesCount,
    isDislike,
    toggleDislike,
    dislikesCount,
    isOwner,
    removePostCallback
  } = usePost(post)

  return (
    <Flex gap={8}>
      <Avatar
        size={52}
        icon={<img src={photo} alt="user photo" />}
        className={s.avatar}
      />
      <Flex vertical justify="space-around">
        <Typography.Text>{message}</Typography.Text>

        {/* buttons */}
        <Flex gap={5} className={s.buttonsWrapper}>
          <Flex>
            {isLike ? (
              <LikeFilled onClick={toggleLike} />
            ) : (
              <LikeOutlined onClick={toggleLike} />
            )}
            {likesCount}
          </Flex>
          <Flex>
            {isDislike ? (
              <DislikeFilled onClick={toggleDislike} />
            ) : (
              <DislikeOutlined onClick={toggleDislike} />
            )}
            {dislikesCount}
          </Flex>
          {isOwner && <DeleteOutlined onClick={removePostCallback} />}
        </Flex>
      </Flex>
    </Flex>
  )
}
