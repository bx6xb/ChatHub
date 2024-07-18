import { Suspense, useEffect } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { ConfigProvider, Layout, Spin, theme } from "antd"
import { useAppDispatch, useAppSelector } from "./utils/redexUtils"
import { setUserData } from "./store/authReducer/asyncActions"
import { getSidebarUsers } from "./store/sidebarReducer/asyncActions"
import s from "./App.module.css"
import { Header } from "./layout/Header/Header"
import { Sidebar } from "./layout/Sidebar/Sidebar"
import { Navigate, Route, Routes } from "react-router-dom"
import { Profile } from "./pages/Profile/Profile"
import Dialogs from "./pages/Dialogs/Dialogs"
import Users from "./pages/Users/Users"
import Login from "./pages/Login/Login"
import { Page404 } from "./pages/Page404/Page404"

const App = () => {
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)

  const dispatch = useAppDispatch()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  if (!isAppInitialized) {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: "60px" }} spin />}
        className={s.preloader}
      />
    )
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "#5500ff",
            activeBarBorderWidth: 0,
            itemSelectedColor: "black",
            itemColor: "black",
          },
          Button: {
            defaultBg: "#5500ff",
            defaultActiveBorderColor: "#5500ff",
            defaultActiveColor: "#5500ff",
            defaultColor: "#fff",
          },
        },
      }}
    >
      <Layout className={s.app}>
        <Sidebar />
        <Layout>
          <Header />
          <Layout.Content
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<div>Preloader</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/profile/:id?" element={<Profile />} />
                <Route path="/dialogs" element={<Dialogs />} />
                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
