import React from "react"
import ReactDOM from "react-dom/client"
import { loader } from "@monaco-editor/react"
import { MantineProvider } from "@mantine/core"
import App from "./components/App"

loader.config({
  paths: { vs: "https://cdn.staticfile.org/monaco-editor/0.34.1/min/vs" },
  "vs/nls": { availableLanguages: { "*": "zh-cn" } },
})

const root = ReactDOM.createRoot(document.getElementById("root"))

const customTheme = {
  components: {
    Button: {
      styles: {
        root: { fontWeight: 400 }
      }
    }
  }
}

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme} >
    <App />
  </MantineProvider>
)
