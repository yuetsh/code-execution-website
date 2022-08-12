import React from "react"
import { useSnapshot } from "valtio"
import Editor from "@monaco-editor/react"
import { Allotment } from "allotment"
import { Spin } from "antd"
import { language } from "../../assets/templates"
import styles from "./Content.module.css"
import {
  state,
  sourceEditorDidMount,
  stdinEditorDidMount,
  onSource,
  onStdin,
} from "../../store"
import { monacoConfig } from "../../utils"

function Content() {
  const { languageID, theme, fontSize, sourceValue, stdinValue, stdoutValue } =
    useSnapshot(state)

  return (
    <div className={styles.content}>
      <Allotment defaultSizes={[2, 1]}>
        <Allotment.Pane>
          <Editor
            value={sourceValue}
            language={language[languageID]}
            onMount={sourceEditorDidMount}
            onChange={onSource}
            loading={<Spin />}
            theme={theme}
            options={{
              ...monacoConfig,
              fontSize,
              lineNumbers: true,
              scrollBeyondLastLine: true,
            }}
          />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment vertical defaultSizes={[1, 2]}>
            <Allotment.Pane>
              <Editor
                value={stdinValue}
                defaultLanguage="plaintext"
                onMount={stdinEditorDidMount}
                onChange={onStdin}
                loading={<Spin />}
                theme={theme}
                options={{ ...monacoConfig, fontSize }}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <Editor
                value={stdoutValue}
                defaultLanguage="plaintext"
                loading={<Spin />}
                theme={theme}
                options={{ ...monacoConfig, fontSize, readOnly: true }}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default Content
