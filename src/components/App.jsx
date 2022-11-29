import React, { useEffect, useState } from "react"
import { useSnapshot } from "valtio"
import { MantineProvider, ColorSchemeProvider } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { useMonaco } from "@monaco-editor/react"
import Desktop from "./desktop"
import Mobile from "./mobile"
import { state, onTheme } from "../store"
import themeList from "../assets/themelist.json"

function App() {
  const BREAKPOINT = 900
  const monaco = useMonaco()
  const { width } = useViewportSize()
  const { primary, theme } = useSnapshot(state)

  const defaultValue =
    width > BREAKPOINT ? localStorage.getItem("fontsize") || 24 : 16
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
      width > BREAKPOINT ? localStorage.getItem("fontsize") || 24 : 16
    state.fontSize = parseInt(defaultValue, 10)
  }, [width])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
        <div style={{ backgroundColor: primary }}>
          {width > BREAKPOINT ? <Desktop /> : <Mobile />}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
