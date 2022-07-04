import React, { useEffect } from 'react'
import { message } from 'antd'
import 'allotment/dist/style.css'
import AppStore from './App.store'
import Header from './Header'
import Content from './Content'

message.config({ maxCount: 1 })

function App() {
  const { monaco, theme, header, changeTheme, run } = AppStore.useContainer()

  useEffect(() => {
    if (monaco) {
      changeTheme(theme)
    }

    window.addEventListener("keydown", e => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault()
            break
          case 'r':
            e.preventDefault()
            break
          default:
            break
        }
      }
      if (e.key === 'F5') {
        e.preventDefault()
        run()
      }
    })
    // eslint-disable-next-line
  }, [monaco])

  return (
    <div style={{ backgroundColor: header.primary }}>
      <Header />
      <Content />
    </div>
  )
}

export default App
