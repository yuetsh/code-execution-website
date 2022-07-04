import React from 'react'
import ReactDOM from 'react-dom/client'
import { loader } from '@monaco-editor/react'
import './index.css'
import App from './components/App'
import AppStore from './components/App.store'

loader.config({
  paths: { vs: "https://cdn.staticfile.org/monaco-editor/0.33.0/min/vs" },
  "vs/nls": { availableLanguages: { "*": "zh-cn" } }
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AppStore.Provider>
      <App />
    </AppStore.Provider>
  </React.StrictMode>
)