import React from 'react'
import ReactDOM from 'react-dom/client'
import { loader } from '@monaco-editor/react'
import './index.css'
import App from './components/App'

loader.config({
  paths: { vs: "https://cdn.staticfile.org/monaco-editor/0.33.0/min/vs" },
  "vs/nls": { availableLanguages: { "*": "zh-cn" } }
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)