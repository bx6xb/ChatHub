import { Avatar, Button, Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import { profileSelectors } from '../../../store/profileReducer'
import { useAppSelector } from '../../../utils/reduxUtils'
import { authSelectors } from '../../../store/authReducer'
import s from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'

export const ProfileCard = () => {
  // get data from the state
  const fullName = useAppSelector(profileSelectors.selectFullName)
  const userPhoto = useAppSelector(profileSelectors.selectPhoto)
  const profileStatus = useAppSelector(profileSelectors.selectProfileStatus)
  const userId = useAppSelector(profileSelectors.selectUserId)
  const authorizedUserId = useAppSelector(authSelectors.selectId)

  // localization
  const { t } = useTranslation()

  // jsx variables
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
