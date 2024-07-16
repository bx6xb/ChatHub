import { useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"
import userDefaultPhoto from "../../assets/images/userDefaultPhoto.png"
import { profileSelectors } from "../../store/profileReducer"
import { Avatar, Button, Flex, Layout, Popover } from "antd"
import { ProfilePopOver } from "./ProfilePopOver/ProfilePopOver"
import logo from "../../assets/images/logo.png"
import s from "./Header.module.css"

export const Header = () => {
  const { isAuth } = useAppSelector(authSelectors.selectAuthState)
  const userAvatar = useAppSelector(profileSelectors.selectPhoto)

  return (
    <Layout.Header className={s.header}>
      <Flex justify="space-between" align="center" className={s.flexWrapper}>
        <img src={logo} alt="logo" className={s.logo} />
        {isAuth ? (
          <Popover content={ProfilePopOver} title="">
            <Avatar icon={<img src={userAvatar || userDefaultPhoto} alt="avatar" />} />
          </Popover>
        ) : (
          <Button type="primary">Login</Button>
        )}
      </Flex>
    </Layout.Header>
  )
}
