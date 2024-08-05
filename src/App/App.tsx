import { Suspense, useEffect } from 'react'
import { ConfigProvider, Layout, ThemeConfig } from 'antd'
import { useAppDispatch, useAppSelector } from '../utils/reduxUtils/reduxUtils'
import { setUserData } from '../store/auth/asyncActions'
import { getSidebarUsers } from '../store/sidebar/asyncActions'
import s from './App.module.scss'
import { Header } from '../layout/Header/Header'
import { Sidebar } from '../layout/Sidebar/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from '../pages/Profile/Profile'
import Users from '../pages/Users/Users'
import { Login } from '../pages/Login/Login'
import { Page404 } from '../pages/Page404/Page404'
import { Colors } from '../styles/Colors'
import { ProfileForm } from '../pages/ProfileForm/ProfileForm'
import { Loading } from '../components/Loading/Loading'
import { getProfileStatus, getUserProfile } from '../store/profile/asyncActions'
import { setAuthorizedUserPhoto } from '../store/auth/reducer'
import { SnackbarContainer } from './SnackbarContainer/SnackbarContainer'
import { selectIsAppInitialized } from '../store/app/selectors'
import { selectId } from '../store/auth/selectors'

const antDesignTheme: ThemeConfig = {
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
}

const App = () => {
  // get data from the state
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  const authorizedUserId = useAppSelector(selectId)!

  // dispatch
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  useEffect(() => {
    // get authorized user data to set user photo for pop over header
    if (authorizedUserId) {
      dispatch(getUserProfile(authorizedUserId)).then(data => {
        if (getUserProfile.fulfilled.match(data)) {
          const userPhoto = data.payload.photos.large
          dispatch(setAuthorizedUserPhoto(userPhoto))
        }
      })
      // get the user's logged in status to set it on the profile form page if the user reloads the page here
      dispatch(getProfileStatus(authorizedUserId))
    }
  }, [authorizedUserId])

  // show loading
  if (!isAppInitialized) {
    return <Loading />
  }

  return (
    <ConfigProvider theme={antDesignTheme}>
      <Layout className={s.app}>
        <SnackbarContainer />
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
