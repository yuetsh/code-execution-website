import React from "react"
import { AppShell } from "@mantine/core"

import Header from "./Header"
import Content from "./Content"

function Mobile() {
  return (
    <AppShell header={<Header />} padding="0">
      <Header />
      <Content />
    </AppShell>
  )
}

export default Mobile
