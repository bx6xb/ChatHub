import { useAppSelector } from '../../utils/redexUtils'
import { authSelectors } from '../../store/authReducer'
import { sidebarSelectors } from '../../store/sidebarReducer'
import { Avatar, Flex, Layout, Menu, Typography } from 'antd'
import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import defaultUserPhoto from '../../assets/images/userDefaultPhoto.png'
import s from './Sidebar.module.scss'
import { useEffect, useState } from 'react'
import { ItemType } from 'antd/es/menu/interface'

const menuItems = [
  {
    label: 'Profile',
    path: '/profile',
    icon: <UserOutlined />
  },
  {
    label: 'Users',
    path: '/users',
    icon: <TeamOutlined />
  }
]

export const Sidebar = () => {
  // get data from state
  const users = useAppSelector(sidebarSelectors.selectUsers)
  const isAuth = useAppSelector(authSelectors.selectIsAuth)

  // local state
  const [isCollapsed, setIsCollapsed] = useState(true)

  // add swipe listeners on first init
  useEffect(() => {
    document.addEventListener('touchstart', touchstart, false)
    document.addEventListener('touchend', touchend, false)
    return () => {
      document.removeEventListener('touchstart', touchstart, false)
      document.removeEventListener('touchend', touchend, false)
    }
  }, [])

  // function variables
  let touchstartX = 0
  let touchendX = 0

  // swipe functions
  const swipeHandler = () => {
    if (touchendX < touchstartX && touchstartX - touchendX > 120) {
      // left swipe
      setIsCollapsed(true)
    }
    if (touchendX > touchstartX && touchendX - touchstartX > 120) {
      // right swipe
      setIsCollapsed(false)
    }
  }
  const touchstart = (e: TouchEvent) => {
    touchstartX = e.changedTouches[0].screenX
  }
  const touchend = (e: TouchEvent) => {
    touchendX = e.changedTouches[0].screenX
    swipeHandler()
  }

  // jsx variables
  const mappedMenuItems: ItemType[] = menuItems.map(i => ({
    key: i.label,
    icon: i.icon,
    label: <Link to={i.path}>{i.label}</Link>,
    onClick: () => setIsCollapsed(true)
  }))

  return (
    <>
      <div className={isCollapsed ? '' : s.blackScreen} />
      <Layout.Sider
        trigger={null}
        className={`${s.sidebar} ${isCollapsed ? s.collapsed : ''}`}>
        <Menu
          className={s.menu}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={mappedMenuItems}
        />
        {isAuth && (
          <>
            <Typography.Title level={4}>Friends online</Typography.Title>

            <ul className={s.friends}>
              {users &&
                users.map(u => (
                  <li key={u.id}>
                    <Link to={'profile/' + u.id.toString()}>
                      <Flex align="center" gap={5}>
                        <Avatar
                          icon={
                            <img
                              src={u.photos.large || defaultUserPhoto}
                              alt="avatar"
                            />
                          }
                        />
                        <span>{u.name}</span>
                      </Flex>
                    </Link>
                  </li>
                ))}
            </ul>
          </>
        )}
      </Layout.Sider>
    </>
  )
}
