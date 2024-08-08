import { Flex, Layout, Menu, Typography } from 'antd'
import s from './Sidebar.module.scss'
import { useSidebar } from './useSidebar'

export const Sidebar = () => {
  const {
    isAuth,
    isCollapsed,
    toggleIsCollapsed,
    t,
    mappedMenuItems,
    mappedUsers
  } = useSidebar()

  return isAuth ? (
    <>
      <div
        className={isCollapsed ? '' : s.blackScreen}
        onClick={toggleIsCollapsed}
      />

      <Flex
        justify="space-between"
        vertical
        className={s.hamburger}
        onClick={toggleIsCollapsed}>
        <span />
        <span />
        <span />
      </Flex>

      <Layout.Sider
        trigger={null}
        className={`${s.sidebar} ${isCollapsed ? s.collapsed : ''}`}>
        <Typography.Title level={4}>{t('Sidebar_navigation')}</Typography.Title>
        <Menu
          className={s.menu}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={mappedMenuItems}
        />
        <Typography.Title level={4}>
          {t('Sidebar_friends_online')}
        </Typography.Title>

        <ul className={s.friends}>{mappedUsers}</ul>
      </Layout.Sider>
    </>
  ) : null
}
