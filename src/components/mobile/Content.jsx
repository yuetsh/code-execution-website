import React from "react"
import { Tabs, Flex, Loader } from "@mantine/core"
import { useSnapshot } from "valtio"
import Editor from "@monaco-editor/react"
import Helper from "./Helper"
import styles from "./Content.module.css"
import {
  state,
  sourceEditorDidMount,
  stdinEditorDidMount,
  onSource,
  onStdin,
} from "../../store"
import { language } from "../../assets/templates"
import { monacoConfig } from "../../utils"

function Content() {
  const {
    languageID,
    theme,
    fontSize,
    sourceValue,
    stdinValue,
    stdoutValue,
    header,
  } = useSnapshot(state)

  return (
    <Flex direction="column" className={styles.content}>
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
          lineNumbers: false,
          scrollBeyondLastColumn: false,
        }}
      />
      <Tabs variant="outline" defaultValue="helper">
        <Tabs.List style={{ backgroundColor: header.primary }}>
          <Tabs.Tab
            value="helper"
            style={{ color: header.type === "dark" ? "white" : "black" }}
          >
            编程助手
          </Tabs.Tab>
          <Tabs.Tab
            value="stdin"
            style={{ color: header.type === "dark" ? "white" : "black" }}
          >
            输入信息
          </Tabs.Tab>
          <Tabs.Tab
            value="stdout"
            style={{ color: header.type === "dark" ? "white" : "black" }}
          >
            输出信息
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="helper">
          <div style={{ height: 260, backgroundColor: header.primary }}>
            <Helper />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="stdin">
          <Editor
            height={260}
            value={stdinValue}
            defaultLanguage="plaintext"
            onMount={stdinEditorDidMount}
            onChange={onStdin}
            theme={theme}
            loading={<Loader />}
            options={{ ...monacoConfig, fontSize }}
          />
        </Tabs.Panel>
        <Tabs.Panel value="stdout">
          <Editor
            height={260}
            value={stdoutValue}
            defaultLanguage="plaintext"
            theme={theme}
            loading={<Loader />}
            options={{ ...monacoConfig, fontSize, readOnly: true }}
          />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  )
}

export default Content
