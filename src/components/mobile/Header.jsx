import React from "react"
import {
  SegmentedControl,
  Paper,
  Space,
  Flex,
  Button,
  Modal,
  CopyButton,
  Title,
  Header as MantineHeader,
} from "@mantine/core"
import CaretRightIcon from "../shared/CaretRightIcon"
import { useSnapshot } from "valtio"
import {
  state,
  run,
  onTheme,
  onRestore,
  toggleSettings,
  onLanguage,
} from "../../store"
import { useMonaco } from "@monaco-editor/react"

function Header() {
  const {
    header,
    runBtnLoading,
    theme,
    showSettings,
    languageID,
    sourceValue,
  } = useSnapshot(state)
  const monaco = useMonaco()

  return (
    <>
      <MantineHeader
        height={60}
        p="0 16px"
        withBorder={false}
        style={{ backgroundColor: header.primary }}
      >
        <Flex justify="space-between" align="center">
          <Title
            order={4}
            style={{ color: header.type === "dark" ? "white" : "black" }}
          >
            徐越的自测猫
          </Title>
          <Flex gap="xs" mih={60} align="center">
            <Button
              variant="default"
              style={{ fontWeight: 400 }}
              disabled={!monaco}
              onClick={toggleSettings}
            >
              设置
            </Button>
            <Button
              disabled={!monaco}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              onClick={run}
              loading={runBtnLoading}
              leftIcon={<CaretRightIcon />}
            >
              运行
            </Button>
          </Flex>
        </Flex>
      </MantineHeader>
      <Modal opened={showSettings} onClose={toggleSettings} title="设置">
        <Paper>
          <Flex align="center">
            <span>语言：</span>
            <SegmentedControl
              value={languageID}
              onChange={onLanguage}
              data={[
                { label: "C", value: "50" },
                { label: "C++", value: "54" },
                { label: "Python", value: "71" },
                { label: "Java", value: "62" },
              ]}
            />
          </Flex>
          <Space h="md" />
          <Flex align="center">
            <span>主题：</span>
            <SegmentedControl
              value={theme}
              onChange={(val) => onTheme(monaco, val)}
              data={[
                { label: "浅色", value: "vs-light" },
                { label: "暗色", value: "dracula" },
              ]}
            />
          </Flex>
          <Space h="md" />
          <Flex align="center">
            <span>代码：</span>
            <Flex gap="xs">
              <Button size="md" onClick={onRestore}>
                重置
              </Button>
              <CopyButton value={sourceValue}>
                {({ copied, copy }) => (
                  <Button size="md" onClick={copy}>
                    {copied ? "成功" : "复制"}
                  </Button>
                )}
              </CopyButton>
            </Flex>
          </Flex>
        </Paper>
      </Modal>
    </>
  )
}

export default Header
