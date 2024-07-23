import s from './Post.module.css'
import { Post as PostType } from '../../../../store/profileReducer/types'
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined
} from '@ant-design/icons'
import { useAppDispatch } from '../../../../utils/redexUtils'
import { changePostData } from '../../../../store/profileReducer/profileReducer'
import { useState } from 'react'
import { Avatar, Flex, Typography } from 'antd'

export const Post = ({ post, photo }: PostProps) => {
  // destructuring post object
  const { id, message, likesCount, dislikesCount } = post

  // local state
  const [isLike, setIsLike] = useState(false)
  const [isDislike, setIsDislike] = useState(false)

  // dispatch
  const dispatch = useAppDispatch()

  // callbacks
  const increaseLikes = () => {
    if (isDislike) {
      dispatch(
        changePostData({
          id,
          data: {
            dislikesCount: dislikesCount - 1
          }
        })
      )
    }
    dispatch(
      changePostData({
        id,
        data: {
          likesCount: likesCount + 1
        }
      })
    )
    setIsLike(true)
    setIsDislike(false)
  }

  const increaseDislikes = () => {
    if (isLike) {
      dispatch(
        changePostData({
          id,
          data: {
            likesCount: likesCount - 1
          }
        })
      )
    }
    dispatch(
      changePostData({
        id,
        data: {
          dislikesCount: dislikesCount + 1
        }
      })
    )
    setIsDislike(true)
    setIsLike(false)
  }

  return (
    <Flex gap={8}>
      <Avatar size={52} icon={<img src={photo} alt="user photo" />} />
      <Flex vertical justify="space-around">
        <Typography.Text>{message}</Typography.Text>

        <Flex gap={5}>
          <div>
            <button
              className={s.button}
              onClick={increaseLikes}
              disabled={isLike}
            >
              {isLike ? <LikeFilled /> : <LikeOutlined />}
            </button>
            {likesCount}
          </div>
          <div>
            <button
              className={s.button}
              onClick={increaseDislikes}
              disabled={isDislike}
            >
              {isDislike ? <DislikeFilled /> : <DislikeOutlined />}
            </button>
            {dislikesCount}
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

// types
type PostProps = {
  post: PostType
  photo: string
}
