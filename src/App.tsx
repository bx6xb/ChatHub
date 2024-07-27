import { Suspense, useEffect } from 'react'
import { ConfigProvider, Layout, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from './utils/redexUtils'
import { setUserData } from './store/authReducer/asyncActions'
import { getSidebarUsers } from './store/sidebarReducer/asyncActions'
import s from './App.module.scss'
import { Header } from './layout/Header/Header'
import { Sidebar } from './layout/Sidebar/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile/Profile'
import Dialogs from './pages/Dialogs/Dialogs'
import Users from './pages/Users/Users'
import Login from './pages/Login/Login'
import { Page404 } from './pages/Page404/Page404'
import { Colors } from './styles/Colors'
import { ProfileForm } from './pages/ProfileForm/ProfileForm'
import { Loading } from './components/Loading/Loading'

const App = () => {
  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  if (!isAppInitialized) {
    return <Loading />
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: Colors.secondary,
            activeBarBorderWidth: 0,
            itemSelectedColor: Colors.black,
            itemColor: Colors.black
          },
          Button: {
            // default
            defaultBg: Colors.primary,
            defaultColor: Colors.white,
            defaultBorderColor: Colors.primary,
            // hover
            defaultHoverBg: Colors.secondary,
            defaultHoverColor: Colors.white,
            defaultHoverBorderColor: Colors.white,
            // active
            defaultActiveBg: Colors.secondary,
            defaultActiveColor: Colors.primary,
            defaultActiveBorderColor: Colors.primary
          },
          Typography: {
            colorTextHeading: Colors.white,
            colorText: Colors.white
          }
        }
      }}
    >
      <Layout className={s.app}>
        <Header />
        <Layout>
          <Sidebar />
          <Layout.Content className={s.content}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/profile/:id?" element={<Profile />} />
                <Route path="/edit-profile" element={<ProfileForm />} />
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
