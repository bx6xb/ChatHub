import { Avatar, Button, Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.png'
import { profileSelectors } from '../../../store/profileReducer'
import { useAppSelector } from '../../../utils/redexUtils'
import { authSelectors } from '../../../store/authReducer'
import s from './ProfileCard.module.css'

export const ProfileCard = () => {
  // get data from state
  const fullName = useAppSelector(profileSelectors.selectFullName)
  const userPhoto = useAppSelector(profileSelectors.selectPhoto)
  const profileStatus = useAppSelector(profileSelectors.selectProfileStatus)
  const userId = useAppSelector(profileSelectors.selectUserId)
  const authorizedUserId = useAppSelector(authSelectors.selectId)

  // variables
  const isOwner = userId === authorizedUserId

  return (
    <Flex justify="space-between" wrap className={s.profileCard}>
      <Flex gap={10} align="center" style={{ marginBottom: '10px' }}>
        <Avatar
          size={102}
          icon={<img src={userPhoto || userDefaultPhoto} alt="user" />}
        />
        <Flex vertical>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {fullName}
          </Typography.Title>
          <Typography.Paragraph style={{ margin: 0 }}>
            {profileStatus}
          </Typography.Paragraph>
        </Flex>
      </Flex>

      {isOwner && (
        <Link to="/edit-profile">
          <Button>Edit profile</Button>
        </Link>
      )}
    </Flex>
  )
}
