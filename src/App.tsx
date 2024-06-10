import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Sidebar } from "./pages/Sidebar/Sidebar"
import { Suspense, lazy, useEffect } from "react"
import { Profile } from "./pages/Profile/Profile"
import { Header } from "./layout/Header/Header"
import { useAppDispatch, useAppSelector } from "./store/store"
import { Preloader } from "./components/Preloader/Preloader"
import { setUserData } from "./store/authReducer/authReducer"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { getSidebarUsers } from "./store/sidebarReducer/sidebarReducer"
import { Page404 } from "./pages/Page404/Page404"

const Dialogs = lazy(() => import("./pages/Dialogs/Dialogs"))
const Users = lazy(() => import("./pages/Users/Users"))
const Login = lazy(() => import("./pages/Login/Login"))

function App() {
  const { isAppInitialized, error } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
    dispatch(getSidebarUsers())
  }, [])

  if (!isAppInitialized) {
    return (
      <div className="preloader">
        <Preloader />
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <Snackbar message={error} />
      <Header />
      <Sidebar />
      <div className="app-wrapper-content">
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
    </div>
  )
}

export default App
