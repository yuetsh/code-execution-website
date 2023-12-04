import React from "react"
import { Menu, Tabs, Stack, Loader, Group, Button } from "@mantine/core"
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
  copy,
} from "../../store"
import { language } from "../../assets/templates"
import { monacoConfig } from "../../utils"

function Content() {
  const { languageID, theme, fontSize, sourceValue, stdinValue, stdoutValue } =
    useSnapshot(state)

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
          scrollBeyondLastColumn: false,
        }}
      />
      <Tabs variant="outline" defaultValue="stdin">
        <Tabs.List>
          <Tabs.Tab value="stdin">输入信息</Tabs.Tab>
          <Tabs.Tab value="stdout">运行结果</Tabs.Tab>
          <Menu position="top" closeOnClickOutside={false}>
            <Menu.Target>
              <Tabs.Tab value="helper">编程助手</Tabs.Tab>
            </Menu.Target>
            <Menu.Dropdown>
              <Group position="apart">
                <Menu.Label>编程助手</Menu.Label>
                <Group spacing="xs">
                  <Button variant="default" size="xs" onClick={onRestore}>
                    重置
                  </Button>
                  <Button size="xs" onClick={copy}>
                    复制
                  </Button>
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
      <a
        className={styles.beian}
        href="https://beian.miit.gov.cn"
        target="_blank"
      >
        浙ICP备2023044109号
      </a>
    </Stack>
  )
}

export default Content
