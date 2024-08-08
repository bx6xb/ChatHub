import { Avatar, Button, Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import { useAppSelector } from '../../../utils/reduxUtils/reduxUtils'
import s from './ProfileCard.module.scss'
import { selectId } from '../../../store/auth/selectors'
import {
  selectFullName,
  selectPhoto,
  selectProfileStatus,
  selectUserId
} from '../../../store/profile/selectors'
import { useTranslation } from 'react-i18next'

export const ProfileCard = () => {
  // get data from the state
  const fullName = useAppSelector(selectFullName)
  const userPhoto = useAppSelector(selectPhoto)
  const profileStatus = useAppSelector(selectProfileStatus)
  const userId = useAppSelector(selectUserId)
  const authorizedUserId = useAppSelector(selectId)

  // localization
  const { t } = useTranslation()

  // variables
  const isOwner = userId === authorizedUserId

  return (
    <Flex justify="space-between" wrap className={s.profileCard}>
      <Flex gap={10} align="center">
        <Avatar
          size={102}
          icon={<img src={userPhoto || userDefaultPhoto} alt="user" />}
        />
        <Flex vertical>
          <Typography.Title level={3}>{fullName}</Typography.Title>
          <Typography.Paragraph>{profileStatus}</Typography.Paragraph>
        </Flex>
      </Flex>

      {isOwner && (
        <Link to="/edit-profile">
          <Button>{t('HeaderPopoverContent_edit_profile')}</Button>
        </Link>
      )}
    </Flex>
  )
}
