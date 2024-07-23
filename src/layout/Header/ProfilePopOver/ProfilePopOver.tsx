import { Button, Divider, Flex, Menu } from 'antd'
import { useAppDispatch } from '../../../utils/redexUtils'
import { logout } from '../../../store/authReducer/asyncActions'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const ProfilePopOver = () => {
  const dispatch = useAppDispatch()

  const logoutOnClick = () => {
    dispatch(logout())
  }

  return (
    <Flex vertical align="center">
      <Menu
        mode="vertical"
        items={[
          {
            label: <Link to={'/profile'}>Profile</Link>,
            key: 'Profile',
            icon: <UserOutlined />
          },
          {
            label: <Link to="/edit-profile">Edit profile</Link>,
            key: 'Edit profile',
            icon: <EditOutlined />
          }
        ]}
      />
      <Divider />
      <Button onClick={logoutOnClick}>Logout</Button>
    </Flex>
  )
}
