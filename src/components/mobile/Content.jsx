import React from "react"
import {
  Button,
  Menu,
  Tabs,
  Stack,
  Loader,
  CopyButton,
  Group,
} from "@mantine/core"
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
  onRestore,
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
    <Stack className={styles.content}>
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
      <Tabs variant="outline" defaultValue="stdin">
        <Tabs.List style={{ backgroundColor: header.primary }}>
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
          <Menu position="top" closeOnClickOutside={false}>
            <Menu.Target>
              <Tabs.Tab
                value="helper"
                style={{ color: header.type === "dark" ? "white" : "black" }}
              >
                编程助手
              </Tabs.Tab>
            </Menu.Target>
            <Menu.Dropdown style={{ backgroundColor: header.primary }}>
              <Group position="apart">
                <Menu.Label>编程助手</Menu.Label>
                <Group spacing="xs">
                  <Button
                    variant="default"
                    style={{ fontWeight: 400 }}
                    size="xs"
                    onClick={onRestore}
                  >
                    重置
                  </Button>
                  <CopyButton value={sourceValue}>
                    {({ copied, copy }) => (
                      <Button size="xs" onClick={copy}>
                        {copied ? "成功" : "复制"}
                      </Button>
                    )}
                  </CopyButton>
                </Group>
              </Group>
              <Helper />
            </Menu.Dropdown>
          </Menu>
        </Tabs.List>
        <Tabs.Panel value="stdin">
          <Editor
            height={300}
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
            height={300}
            value={stdoutValue}
            defaultLanguage="plaintext"
            theme={theme}
            loading={<Loader />}
            options={{ ...monacoConfig, fontSize, readOnly: true }}
          />
        </Tabs.Panel>
        <Tabs.Panel value="helper">
          <div className={styles.box} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}

export default Content
