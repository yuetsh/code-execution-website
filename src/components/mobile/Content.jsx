import React from 'react'
import { useSnapshot } from 'valtio'
import { Spin } from 'antd'
import Editor from '@monaco-editor/react'
import styles from './Content.module.css'
import InputHelper from './InputHelper'
import { state, sourceEditorDidMount, stdinEditorDidMount, onSource, onStdin } from '../../store'
import { language } from '../../assets/templates'
import { monacoConfig } from '../../utils'

function Content() {
  const { languageID, theme, fontSize, sourceValue, stdinValue, stdoutValue } = useSnapshot(state)

  return (
    <div className={styles.content}>
      <div className={styles.source}>
        <Editor
          value={sourceValue}
          language={language[languageID]}
          onMount={sourceEditorDidMount}
          onChange={onSource}
          loading={<Spin />}
          theme={theme}
          options={{ ...monacoConfig, fontSize, lineNumbers: false, scrollBeyondLastColumn: false }}
        />
        <InputHelper />
      </div>
      <div className={styles.stdin}>
        <Editor
          value={stdinValue}
          defaultLanguage="plaintext"
          onMount={stdinEditorDidMount}
          onChange={onStdin}
          loading={<Spin />}
          theme={theme}
          options={{ ...monacoConfig, fontSize }}
        />
      </div>
      <div className={styles.stdout}>
        <Editor
          value={stdoutValue}
          defaultLanguage="plaintext"
          loading={<Spin />}
          theme={theme}
          options={{ ...monacoConfig, fontSize, readOnly: true }}
        />
      </div>

    </div>
  )
}

export default Content