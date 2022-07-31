import React from 'react'
import { useSnapshot } from 'valtio'
import Editor from '@monaco-editor/react'
import { Allotment } from 'allotment'
import { Spin } from 'antd'
import { language } from '../../assets/templates'
import styles from './Content.module.css'
import { state, sourceEditorDidMount, stdinEditorDidMount, stdoutEditorDidMount, onSource } from '../../store'

function Content() {
  const { languageID, theme } = useSnapshot(state)
  
  return (
    <div className={styles.content}>
      <Allotment defaultSizes={[2, 1]}>
        <Allotment.Pane>
          <Editor
            defaultLanguage={language[languageID]}
            language={language[languageID]}
            onMount={sourceEditorDidMount}
            onChange={onSource}
            loading={<Spin />}
            theme={theme}
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
                theme={theme}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <Editor
                defaultLanguage="plaintext"
                defaultValue="输出信息"
                onMount={stdoutEditorDidMount}
                loading={<Spin />}
                theme={theme}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </div >
  )
}

export default Content