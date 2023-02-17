import React from "react"
import ReactDOM from "react-dom/client"
import { loader } from "@monaco-editor/react"
import App from "./components/App"
import { getChromeVersion } from "./utils"

const isLowVersion = getChromeVersion() < 70
const monacoUrl = isLowVersion
  ? "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs"
  : "https://cdn.staticfile.org/monaco-editor/0.34.1/min/vs"

loader.config({
  paths: { vs: monacoUrl },
  "vs/nls": { availableLanguages: { "*": "zh-cn" } },
})

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<App />)
