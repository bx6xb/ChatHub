import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Navbar } from "./pages/Navbar/Navbar"
import { Login } from "./pages/Login/Login"
import { useEffect } from "react"
import { setUserDataTC } from "./redux/authReducer/authReducer"
import { useDispatch } from "react-redux"
import { Profile } from "./pages/Profile/Profile"
import { Users } from "./pages/Users/Users"
import { Header } from "./layout/Header/Header"
import { Dialogs } from "./pages/Dialogs/Dialogs"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserDataTC())
  }, [])

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
