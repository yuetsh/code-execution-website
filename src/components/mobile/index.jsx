import React, { useEffect } from "react"
import { AppShell } from "@mantine/core"
import { useSnapshot } from "valtio"
import { useMonaco } from "@monaco-editor/react"
import Header from "./Header"
import Content from "./Content"
import { state, onTheme } from "../../store"

function Mobile() {
  const { theme } = useSnapshot(state)
  const monaco = useMonaco()
  useEffect(() => {
    if (monaco) {
      onTheme(monaco, theme)
    }
  }, [monaco])
  return (
    <AppShell header={<Header />} padding="0">
      <Header />
      <Content />
    </AppShell>
  )
}

export default Mobile
