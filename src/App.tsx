import { Navigate, Route, Routes } from "react-router-dom"
import s from "./App.module.css"
import { Sidebar } from "./layout/Sidebar/Sidebar"
import { Suspense, lazy, useEffect } from "react"
import { Profile } from "./pages/Profile/Profile"
import { Header } from "./layout/Header/Header"
import { Preloader } from "./components/Preloader/Preloader"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { Page404 } from "./pages/Page404/Page404"
import { getSidebarUsers } from "./store/sidebarReducer/asyncActions"
import { useAppDispatch, useAppSelector } from "./utils/redexUtils"
import { appSelectors } from "./store/appReducer"
import { Container } from "./components/Container/Container"
import { setUserData } from "./store/authReducer/asyncActions"

const Dialogs = lazy(() => import("./pages/Dialogs/Dialogs"))
const Users = lazy(() => import("./pages/Users/Users"))
const Login = lazy(() => import("./pages/Login/Login"))

function App() {
  const isAppInitialized = useAppSelector(appSelectors.selectIsAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  if (!isAppInitialized) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    )
  }

  return (
    <>
      <Header />
      <Container className={s.content}>
        <Snackbar />
        <Sidebar />
        <div className={s.appWrapperContent}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile/:id?" element={<Profile />} />
              <Route path="/dialogs" element={<Dialogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </div>
      </Container>
    </>
  )
}

export default App
