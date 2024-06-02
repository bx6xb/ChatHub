import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Navbar } from "./pages/Navbar/Navbar"
import { Suspense, lazy, useEffect } from "react"
import { Profile } from "./pages/Profile/Profile"
import { Header } from "./layout/Header/Header"
import { useAppDispatch, useAppSelector } from "./store/store"
import { Preloader } from "./components/Preloader/Preloader"
import { setUserData } from "./store/authReducer/authReducer"

const Dialogs = lazy(() => import("./pages/Dialogs/Dialogs"))
const Users = lazy(() => import("./pages/Users/Users"))
const Login = lazy(() => import("./pages/Login/Login"))

function App() {
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserData())
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
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile/:id?" element={<Profile />} />
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
