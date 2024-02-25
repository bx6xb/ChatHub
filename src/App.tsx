import { Route } from "react-router-dom"
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
    <div className="App">
      <Header />
      <Navbar state={props.state.sidebar} />
      <div className="app-wrapper-content">
        <Route path="/dialogs" Component={() => <Dialogs state={props.state.dialogsPage} />} />
        <Route path="/profile" Component={() => <Profile state={props.state.profilePage} addPost={props.addPost} />} />
      </div>
    </div>
  )
}

export default App
