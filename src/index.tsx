import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { addPost, state, subscribe, updateNewPostText } from "./redux/state"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ReactDOM from "react-dom/client"
import { StateType } from "./redux/state"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const renderEntireTree = (
  state: StateType,
  addPost: () => void,
  updateNewPostText: (text: string) => void
) => {
  root.render(
    <BrowserRouter>
      <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
    </BrowserRouter>
  )
}

renderEntireTree(state, addPost, updateNewPostText)

subscribe(renderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
