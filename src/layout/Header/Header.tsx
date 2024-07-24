import { useAppSelector } from '../../utils/redexUtils'
import { authSelectors } from '../../store/authReducer'
import userDefaultPhoto from '../../assets/images/userDefaultPhoto.png'
import { profileSelectors } from '../../store/profileReducer'
import { Avatar, Button, Flex, Layout, Popover } from 'antd'
import { ProfilePopOver } from './ProfilePopOver/ProfilePopOver'
import s from './Header.module.css'
import { Icon } from '../../components/Icon/Icon'

export const Header = () => {
  const { isAuth } = useAppSelector(authSelectors.selectAuthState)
  const userAvatar = useAppSelector(profileSelectors.selectPhoto)

  return (
    <Layout.Header className={s.header}>
      <Flex justify="space-between" align="center" className={s.flexWrapper}>
        <Icon iconId="logo" width="164" height="40" viewBox="0 0 82 20" />
        {isAuth ? (
          <Popover content={ProfilePopOver} title="">
            <Avatar
              icon={<img src={userAvatar || userDefaultPhoto} alt="avatar" />}
            />
          </Popover>
        ) : (
          <Button type="primary">Login</Button>
        )}
      </Flex>
    </Layout.Header>
  )
}
