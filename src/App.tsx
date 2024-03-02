import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Header } from "./components/Header/Header"
import { Navbar } from "./components/Navbar/Navbar"
import { Dialogs } from "./components/Dialogs/Dialogs"
import { Profile } from "./components/Profile/Profile"
import { ActionType, StateType } from "./redux/state"

type AppPropsType = {
  state: StateType
  dispatch: (action: ActionType) => void
}

function App(props: AppPropsType) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.sidebar} />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dialogs" />} />
          <Route
            path="/profile"
            element={<Profile state={props.state.profilePage} dispatch={props.dispatch} />}
          />
          <Route
            path="/dialogs"
            element={<Dialogs state={props.state.dialogsPage} dispatch={props.dispatch} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
