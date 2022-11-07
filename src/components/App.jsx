import React, { useEffect } from "react"
import { useSnapshot } from "valtio"
import Desktop from "./desktop"
import Mobile from "./mobile"
import { useWindowWidth } from "../utils"
import { state } from "../store"

function App() {
  const width = useWindowWidth()

  const { header } = useSnapshot(state)

  const defaultValue = width > 800 ? localStorage.getItem("fontsize") || 24 : 16
  state.fontSize = parseInt(defaultValue, 10)

  useEffect(() => {
    const defaultValue =
      width > 800 ? localStorage.getItem("fontsize") || 24 : 16
    state.fontSize = parseInt(defaultValue, 10)
  }, [width])

  return (
    <div style={{ backgroundColor: header.primary }}>
      {width > 800 ? <Desktop /> : <Mobile />}
    </div>
  )
}

export default App
