import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Header } from "./layout/Header/Header"
import { Navbar } from "./pages/Navbar/Navbar"
import { DialogsContainer } from "./pages/Dialogs/DialogsContainer"
import { UsersContainer } from "./pages/Users/UsersContainer"
import { ProfileContainer } from "./pages/Profile/ProfileContainer"

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dialogs" />} />
          <Route path="/profile/*" element={<ProfileContainer />} />
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
