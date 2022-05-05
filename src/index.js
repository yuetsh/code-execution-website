import React from 'react'
import ReactDOM from 'react-dom/client'
import { loader } from '@monaco-editor/react'
import './index.css'
import App from './App'

loader.config({ "vs/nls": { availableLanguages: { "*": "zh-cn" } } })
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)