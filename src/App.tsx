import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Navbar } from "./pages/Navbar/Navbar"
import { Login } from "./pages/Login/Login"
import { useEffect } from "react"
import { Profile } from "./pages/Profile/Profile"
import { Users } from "./pages/Users/Users"
import { Header } from "./layout/Header/Header"
import { Dialogs } from "./pages/Dialogs/Dialogs"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { Preloader } from "./components/Preloader/Preloader"
import { setUserData } from "./redux/authReducer/authReducer"

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
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
