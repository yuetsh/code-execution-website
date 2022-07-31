import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { useMonaco } from '@monaco-editor/react'
import { message } from 'antd'
import { state, onTheme, run } from '../../store'
import Header from './Header'
import Content from './Content'
import Live2d from './Live2d'
import 'allotment/dist/style.css'

message.config({ maxCount: 1 })

function Desktop () {
  const { theme, header } = useSnapshot(state)
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      onTheme(monaco, theme)
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
  }, [monaco])

  return (
    <div style={{ backgroundColor: header.primary }}>
      <Header />
      <Content />
      <Live2d />
    </div>
  )
}

export default Desktop
