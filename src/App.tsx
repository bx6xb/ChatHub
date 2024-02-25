import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Header } from "./components/Header/Header"
import { Navbar } from "./components/Navbar/Navbar"
import { Dialogs } from "./components/Dialogs/Dialogs"
import { Profile } from "./components/Profile/Profile"
import { StateType } from "./redux/state"

type AppPropsType = {
  state: StateType
  addPost: (postMessage: string) => void
}

function App(props: AppPropsType) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.sidebar} />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dialogs" />} />
          <Route path="/dialogs" Component={() => <Dialogs state={props.state.dialogsPage} />} />
          <Route
            path="/profile"
            Component={() => <Profile state={props.state.profilePage} addPost={props.addPost} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
