import s from './Post.module.scss'
import { Post as PostType } from '../../../../store/profileReducer/types'
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined
} from '@ant-design/icons'
import { useAppDispatch } from '../../../../utils/reduxUtils'
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

  // callbacks for like/dislike buttons
  const toggleLike = () => {
    // cancel like
    if (isLike) {
      dispatch(
        changePostData({
          id,
          data: {
            likesCount: likesCount - 1
          }
        })
      )
      setIsLike(false)
      return
    }
    // cancel dislike
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
    // increase likes
    dispatch(
      changePostData({
        id,
        data: {
          likesCount: likesCount + 1
        }
      })
    )
    // set state
    setIsLike(true)
    setIsDislike(false)
  }
  const toggleDislike = () => {
    // cancel dislike
    if (isDislike) {
      dispatch(
        changePostData({
          id,
          data: {
            dislikesCount: dislikesCount - 1
          }
        })
      )
      setIsDislike(false)
      return
    }
    // cancel like
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
    // set state
    setIsDislike(true)
    setIsLike(false)
  }

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
