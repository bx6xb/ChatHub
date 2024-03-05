import "./index.css"
import reportWebVitals from "./reportWebVitals"
// import { StoreType, store } from "./redux/state"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ReactDOM from "react-dom/client"
import { AppRootState, store } from "./redux/reduxStore"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const renderEntireTree = (/* state: AppRootState */) => {
  root.render(
    <BrowserRouter>
      <App store={store} state={store.getState()} dispatch={store.dispatch.bind(store)} />
    </BrowserRouter>
  )
}

renderEntireTree(/* store.getState() */)

// store.subscribe(() => {
//   let state = store.getState()
//   renderEntireTree(state)
// })

store.subscribe(renderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
