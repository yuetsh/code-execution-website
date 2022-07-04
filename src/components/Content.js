import React from 'react'
import Editor from '@monaco-editor/react'
import { Allotment } from 'allotment'
import { Row, Spin } from 'antd'
import { language } from '../assets/templates'
import AppStore from './App.store'
import Live2D from './Live2D'
import styles from './App.module.css'

function Content() {
  const {
    languageID,
    sourceEditorDidMount,
    stdinEditorDidMount,
    stdoutEditorDidMount,
    changeSource,
  } = AppStore.useContainer()
  return (
    <Row className={styles.content}>
      <Allotment defaultSizes={[2, 1]}>
        <Allotment.Pane>
          <main className={styles.editorContainer}>
            <Editor
              defaultLanguage={language[languageID]}
              language={language[languageID]}
              onMount={sourceEditorDidMount}
              onChange={changeSource}
              loading={<Spin />}
            />
            <Live2D />
          </main>
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment vertical>
            <Allotment.Pane>
              <Editor
                defaultLanguage="plaintext"
                defaultValue="输入信息"
                onMount={stdinEditorDidMount}
                loading={<Spin />}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <Editor
                defaultLanguage="plaintext"
                defaultValue="输出信息"
                onMount={stdoutEditorDidMount}
                loading={<Spin />}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </Row >
  )
}

export default Content