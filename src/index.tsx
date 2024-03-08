import "./index.css"
import reportWebVitals from "./reportWebVitals"
// import { StoreType, store } from "./redux/stateTypes"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ReactDOM from "react-dom/client"
import { store } from "./redux/reduxStore"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// question store typing
const renderEntireTree = (/* state: AppRootState */) => {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
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
