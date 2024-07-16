import { useAppSelector } from "../../utils/redexUtils"
import { authSelectors } from "../../store/authReducer"
import { sidebarSelectors } from "../../store/sidebarReducer"
import { Avatar, Layout, Menu, Typography } from "antd"
import { MessageOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import defaultUserPhoto from "../../assets/images/userDefaultPhoto.png"
import s from "./Sidebar.module.css"

const menuItems = [
  {
    label: "Profile",
    path: "/profile",
    icon: <UserOutlined />,
  },
  {
    label: "Messages",
    path: "/dialogs",
    icon: <MessageOutlined />,
  },
  {
    label: "Users",
    path: "/users",
    icon: <TeamOutlined />,
  },
]

export const Sidebar = () => {
  const users = useAppSelector(sidebarSelectors.selectUsers)
  const isAuth = useAppSelector(authSelectors.selectIsAuth)

  const mappedMenuItems = menuItems.map((i) => ({
    key: i.label,
    icon: i.icon,
    label: <Link to={i.path}>{i.label}</Link>,
  }))

  return (
    <Layout.Sider trigger={null} collapsible collapsed={false} className={s.sidebar}>
      <Menu
        style={{ backgroundColor: "transparent", color: "green" }}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={mappedMenuItems}
      />

      {isAuth && (
        <>
          <Typography.Title level={4}>Friends online</Typography.Title>

          <ul className={s.friends}>
            {users ? (
              users.map((u) => (
                <li key={u.id}>
                  <Link to={"profile/" + u.id.toString()} className={s.friend}>
                    <Avatar icon={<img src={u.photos.large || defaultUserPhoto} alt="avatar" />} />
                    <span className={s.name}>{u.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <div>Preloader</div>
            )}
          </ul>
        </>
      )}
    </Layout.Sider>
  )
}
