import { Avatar, Button, Flex, List, Typography } from 'antd'
import { Link } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector
} from '../../../utils/reduxUtils/reduxUtils'
import { selectIsFollowingInProgress } from '../../../store/users/selectors'

import { follow, unfollow } from '../../../store/users/asyncActions'
import { User } from '../../../api/types'
import userPhoto from '../../../assets/images/userDefaultPhoto.png'
import s from './UserItem.module.scss'
import { useTranslation } from 'react-i18next'

type UserItemProps = {
  item: User
}

export const UserItem = ({ item }: UserItemProps) => {
  // get data from the state
  const isFollowingInProgress = useAppSelector(selectIsFollowingInProgress)

  // dispatch
  const dispatch = useAppDispatch()

  // localization
  const { t } = useTranslation()

  // callbacks
  const followOnClick = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowOnClick = (userId: number) => {
    dispatch(unfollow(userId))
  }

  // variables
  const isDisabled = isFollowingInProgress.some(id => id === item.id)

  return (
    <List.Item className={s.user}>
      <Flex align="start" justify="space-between" wrap className={s.content}>
        {/* user card */}
        <Link to={'/profile/' + item.id.toString()}>
          <Flex gap={10}>
            <Avatar
              size={70}
              className={s.userPhoto}
              icon={<img src={item.photos.small || userPhoto} alt="avatar" />}
            />

            <Flex vertical>
              <Typography.Title level={5}>{item.name}</Typography.Title>
              <Typography.Paragraph>{item.status}</Typography.Paragraph>
            </Flex>
          </Flex>
        </Link>

        {/* button */}
        {item.followed ? (
          <Button
            onClick={() => unfollowOnClick(item.id)}
            disabled={isDisabled}
          >
            {t('Users_unfollow')}
          </Button>
        ) : (
          <Button onClick={() => followOnClick(item.id)} disabled={isDisabled}>
            {t('Users_follow')}
          </Button>
        )}
      </Flex>
    </List.Item>
  )
}
