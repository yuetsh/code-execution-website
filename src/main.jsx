import React from "react"
import ReactDOM from "react-dom/client"
import * as monaco from "monaco-editor"
import { loader } from "@monaco-editor/react"
import App from "./components/App"
import { getChromeVersion } from "./utils"

const isLowVersion = getChromeVersion() > 70

if (isLowVersion) {
  loader.config({ monaco })
} else {
  loader.config({
    paths: { vs: "https://cdn.staticfile.org/monaco-editor/0.34.1/min/vs" },
    "vs/nls": { availableLanguages: { "*": "zh-cn" } },
  })
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
