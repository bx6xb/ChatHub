import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Header } from "./components/Header/Header"
import { Navbar } from "./components/Navbar/Navbar"
import { Profile } from "./components/Profile/Profile"
import { ActionType, StateType } from "./redux/state"
import { DialogsContainer } from "./components/Dialogs/DialogsContainer"

type AppPropsType = {
  state: StateType
  dispatch: (action: ActionType) => void
  store: any // fix type
}

function App(props: AppPropsType) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.sidebar} />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dialogs" />} />
          <Route path="/profile" element={<Profile store={props.store} />} />
          <Route path="/dialogs" element={<DialogsContainer store={props.store} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
