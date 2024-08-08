import { useEffect, useState } from 'react'
import { selectUsers } from '../../store/sidebar/selectors'
import { selectIsAuth } from '../../store/auth/selectors'
import { useAppSelector } from '../../utils/reduxUtils/reduxUtils'
import { useTranslation } from 'react-i18next'
import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Avatar, Flex } from 'antd'
import defaultUserPhoto from '../../assets/images/userDefaultPhoto.png'
import s from './Sidebar.module.scss'
import { ItemType } from 'antd/es/menu/interface'

export const useSidebar = () => {
  // get data from the state
  const users = useAppSelector(selectUsers)
  const isAuth = useAppSelector(selectIsAuth)

  // local state
  const [isCollapsed, setIsCollapsed] = useState(true)

  // localization
  const { t } = useTranslation()

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

  // callbacks
  const toggleIsCollapsed = () => {
    setIsCollapsed(prev => !prev)
  }

  // variables
  const menuItems = [
    {
      label: t('HeaderPopoverContent_profile'),
      path: '/profile',
      icon: <UserOutlined />
    },
    {
      label: t('Sidebar_users'),
      path: '/users',
      icon: <TeamOutlined />
    }
  ]

  // jsx variables
  const mappedMenuItems: ItemType[] = menuItems.map(i => ({
    key: i.label,
    icon: i.icon,
    label: <Link to={i.path}>{i.label}</Link>,
    onClick: () => setIsCollapsed(true),
    className: s.menuItem
  }))

  const mappedUsers =
    users &&
    users.map(u => (
      <li key={u.id}>
        <Link to={'profile/' + u.id.toString()}>
          <Flex align="center" gap={5}>
            <Avatar
              icon={
                <img src={u.photos.large || defaultUserPhoto} alt="avatar" />
              }
            />
            <span>{u.name}</span>
          </Flex>
        </Link>
      </li>
    ))

  return {
    isAuth,
    isCollapsed,
    toggleIsCollapsed,
    t,
    mappedMenuItems,
    mappedUsers
  }
}
