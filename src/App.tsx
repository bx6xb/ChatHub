import { Suspense, useEffect } from 'react'
import { ConfigProvider, Layout } from 'antd'
import { useAppDispatch, useAppSelector } from './utils/reduxUtils'
import { setUserData } from './store/authReducer/asyncActions'
import { getSidebarUsers } from './store/sidebarReducer/asyncActions'
import s from './styles/App.module.scss'
import { Header } from './layout/Header/Header'
import { Sidebar } from './layout/Sidebar/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile/Profile'
import Users from './pages/Users/Users'
import Login from './pages/Login/Login'
import { Page404 } from './pages/Page404/Page404'
import { Colors } from './styles/Colors'
import { ProfileForm } from './pages/ProfileForm/ProfileForm'
import { Loading } from './components/Loading/Loading'
import { Snackbar } from './components/Snackbar/Snackbar'
import { getUserProfile } from './store/profileReducer/asyncActions'
import { authSelectors } from './store/authReducer'
import userDefaultPhoto from './assets/images/userDefaultPhoto.png'
import { setUserPhoto } from './store/authReducer/authReducer'
import { appSelectors } from './store/appReducer'

const App = () => {
  // get data from the state
  const isAppInitialized = useAppSelector(appSelectors.selectIsAppInitialized)
  const authorizedUserId = useAppSelector(authSelectors.selectId)!

  // dispatch
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  useEffect(() => {
    // get authorized user data to set user photo for header pop over
    if (authorizedUserId) {
      dispatch(getUserProfile(authorizedUserId)).then(data => {
        if (getUserProfile.fulfilled.match(data)) {
          const userPhoto = data.payload.photos.large || userDefaultPhoto
          dispatch(setUserPhoto(userPhoto))
        }
      })
    }
  }, [authorizedUserId])

  // show loading
  if (!isAppInitialized) {
    return <Loading />
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: Colors.transparent,
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
        <Snackbar />
        <Header />
        <Layout>
          <Sidebar />
          <Layout.Content className={s.content}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/profile/:id?" element={<Profile />} />
                <Route path="/edit-profile" element={<ProfileForm />} />
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
