import { Suspense, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, Layout, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from './utils/redexUtils'
import { setUserData } from './store/authReducer/asyncActions'
import { getSidebarUsers } from './store/sidebarReducer/asyncActions'
import s from './App.module.css'
import { Header } from './layout/Header/Header'
import { Sidebar } from './layout/Sidebar/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile/Profile'
import Dialogs from './pages/Dialogs/Dialogs'
import Users from './pages/Users/Users'
import Login from './pages/Login/Login'
import { Page404 } from './pages/Page404/Page404'
import { ProfileForm } from './pages/Profile/ProfileForm/ProfileForm'

const App = () => {
  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  if (!isAppInitialized) {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: '60px' }} spin />}
        className={s.preloader}
      />
    )
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: '#5500ff',
            activeBarBorderWidth: 0,
            itemSelectedColor: 'black',
            itemColor: 'black'
          },
          Button: {
            defaultBg: '#5500ff',
            defaultActiveBorderColor: '#5500ff',
            defaultActiveColor: '#5500ff',
            defaultColor: '#fff'
          }
        }
      }}>
      <Layout className={s.app}>
        <Sidebar />
        <Layout>
          <Header />
          <Layout.Content
            style={{
              padding: '24px',
              background: '#5500ff',
              overflow: 'hidden',
              position: 'relative'
            }}>
            <Suspense fallback={<div>Preloader</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/profile/:id?" element={<Profile />} />
                <Route path="//edit-profile" element={<ProfileForm />} />
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
