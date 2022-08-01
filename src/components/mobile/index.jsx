import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { useMonaco } from '@monaco-editor/react'
import Header from './Header'
import Content from './Content'
import { state, onTheme } from '../../store'

function Mobile() {
  const { header, theme } = useSnapshot(state)
  const monaco = useMonaco()
  useEffect(() => {
    if (monaco) {
      onTheme(monaco, theme)
    }
  }, [monaco])
  return (
    <div style={{ backgroundColor: header.primary }}>
      <Header />
      <Content />
    </div>
  )
}

export default Mobile