import React from 'react'
import Editor from '@monaco-editor/react'
import { Allotment } from 'allotment'
import { Row, Spin } from 'antd'
import { language } from '../assets/templates'
import store from '../store'
import styles from './Content.module.css'

function Content() {
  const {
    languageID,
    sourceEditorDidMount,
    stdinEditorDidMount,
    stdoutEditorDidMount,
    changeSource,
  } = store.useContainer()
  return (
    <Row className={styles.content}>
      <Allotment defaultSizes={[2, 1]}>
        <Allotment.Pane>
          <Editor
            defaultLanguage={language[languageID]}
            language={language[languageID]}
            onMount={sourceEditorDidMount}
            onChange={changeSource}
            loading={<Spin />}
          />
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