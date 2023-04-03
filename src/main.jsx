import React from "react"
import ReactDOM from "react-dom/client"
import { loader } from "@monaco-editor/react"
import App from "./components/App"
import { isLowVersion } from "./utils"

const version = isLowVersion ? "0.30.1" : "0.36.1"
const protocol = isLowVersion ? "http" : "https"

loader.config({
  paths: {
    vs: `${protocol}://cdn.staticfile.org/monaco-editor/${version}/min/vs`,
  },
  "vs/nls": { availableLanguages: { "*": "zh-cn" } },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
