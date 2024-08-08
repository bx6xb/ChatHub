import { useState } from 'react'
import { Post } from '../../../../store/profile/types'
import {
  useAppDispatch,
  useAppSelector
} from '../../../../utils/reduxUtils/reduxUtils'
import { changePostData, removePost } from '../../../../store/profile/reducer'
import { selectUserId } from '../../../../store/profile/selectors'
import { selectId } from '../../../../store/auth/selectors'

export const usePost = (post: Post) => {
  const { id, message, likesCount, dislikesCount } = post

  // get data from the state
  const userId = useAppSelector(selectUserId)
  const authorizedUserId = useAppSelector(selectId)

  // local state
  const [isLike, setIsLike] = useState(false)
  const [isDislike, setIsDislike] = useState(false)

  // dispatch
  const dispatch = useAppDispatch()

  // callbacks
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
  const removePostCallback = () => {
    dispatch(removePost(id))
  }

  // variables
  const isOwner = userId === authorizedUserId

  return {
    message,
    isLike,
    toggleLike,
    likesCount,
    isDislike,
    toggleDislike,
    dislikesCount,
    isOwner,
    removePostCallback
  }
}
