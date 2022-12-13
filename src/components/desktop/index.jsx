import React, { useEffect } from "react"
import { AppShell } from "@mantine/core"
import "allotment/dist/style.css"
import Header from "./Header"
import Content from "./Content"
import Live2d from "./Live2d"
import { run } from "../../store"

function Desktop() {
  useEffect(() => {
    const preventBrowserShortcut = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "s":
            e.preventDefault()
            break
          case "r":
            e.preventDefault()
            break
          default:
            break
        }
      }
      if (e.key === "F5") {
        e.preventDefault()
        run()
      }
    }
    window.addEventListener("keydown", preventBrowserShortcut)
    return () => window.removeEventListener("keydown", preventBrowserShortcut)
  }, [])

  return (
    <AppShell header={<Header />} padding="0">
      <Content />
      <Live2d />
    </AppShell>
  )
}

export default Desktop
