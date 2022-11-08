import React from "react"
import { Loader } from "@mantine/core"
import { useSnapshot } from "valtio"
import Editor from "@monaco-editor/react"
import { Allotment } from "allotment"
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
      <Allotment defaultSizes={[3, 2]}>
        <Allotment.Pane>
          <Editor
            value={sourceValue}
            language={language[languageID]}
            onMount={sourceEditorDidMount}
            onChange={onSource}
            theme={theme}
            loading={<Loader />}
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
                theme={theme}
                loading={<Loader />}
                options={{ ...monacoConfig, fontSize }}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <Editor
                value={stdoutValue}
                defaultLanguage="plaintext"
                theme={theme}
                loading={<Loader />}
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
