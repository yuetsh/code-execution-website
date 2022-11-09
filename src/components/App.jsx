import React, { useEffect, useState } from "react"
import { useSnapshot } from "valtio"
import { MantineProvider, ColorSchemeProvider } from "@mantine/core"
import { useMonaco } from "@monaco-editor/react"
import Desktop from "./desktop"
import Mobile from "./mobile"
import { useWindowWidth } from "../utils"
import { state, onTheme } from "../store"
import themeList from "../assets/themelist.json"

function App() {
  const monaco = useMonaco()
  const width = useWindowWidth()
  const { primary, theme } = useSnapshot(state)

  const defaultValue = width > 800 ? localStorage.getItem("fontsize") || 24 : 16
  state.fontSize = parseInt(defaultValue, 10)

  const [colorScheme, setColorScheme] = useState(themeList[theme].type)
  // TODO 这里有点奇怪，必须使用 state.theme 才可以
  const toggleColorScheme = () => setColorScheme(themeList[state.theme].type)

  const customTheme = {
    colorScheme,
    components: {
      Button: {
        styles: {
          root: { fontWeight: 400 },
        },
      },
    },
  }

  useEffect(() => {
    if (monaco) {
      onTheme(monaco, theme)
      toggleColorScheme()
    }
  }, [monaco])

  useEffect(() => {
    const defaultValue =
      width > 800 ? localStorage.getItem("fontsize") || 24 : 16
    state.fontSize = parseInt(defaultValue, 10)
  }, [width])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
        <div style={{ backgroundColor: primary }}>
          {width > 800 ? <Desktop /> : <Mobile />}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
