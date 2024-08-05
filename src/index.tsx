import './styles/index.scss'
import { HashRouter } from 'react-router-dom'
import App from './App/App'
import ReactDOM from 'react-dom/client'
import { store } from './store/store'
import { Provider } from 'react-redux'
import '@fontsource/inter'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </HashRouter>
)
