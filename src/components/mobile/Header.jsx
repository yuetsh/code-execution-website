import React from "react"
import {
  Stack,
  Group,
  Button,
  Menu,
  Title,
  SegmentedControl,
  Header as MantineHeader,
  useMantineColorScheme,
} from "@mantine/core"
import CaretRightIcon from "../shared/CaretRightIcon"
import { useSnapshot } from "valtio"
import { state, run, onTheme, onLanguage } from "../../store"
import { useMonaco } from "@monaco-editor/react"

function Header() {
  const { primary, runBtnLoading, theme, languageID, accent } =
    useSnapshot(state)
  const monaco = useMonaco()
  const { toggleColorScheme } = useMantineColorScheme()

  const changeTheme = (value) => {
    onTheme(monaco, value)
    toggleColorScheme()
  }

  return (
    <MantineHeader
      height={60}
      p="0 16px"
      withBorder={false}
      style={{ backgroundColor: primary }}
    >
      <Group position="apart" style={{ height: "100%" }}>
        <Title order={4} style={{ color: accent }}>
          徐越的自测猫
        </Title>
        {monaco && (
          <Group spacing="xs">
            <Menu>
              <Menu.Target>
                <Button variant="default">设置</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Group spacing="xs" align="start">
                  <Stack spacing={0} align="center">
                    <Menu.Label>语言</Menu.Label>
                    <SegmentedControl
                      orientation="vertical"
                      value={languageID}
                      onChange={onLanguage}
                      data={[
                        { label: "C", value: "50" },
                        { label: "C++", value: "54" },
                        { label: "Python", value: "71" },
                        { label: "Java", value: "62" },
                      ]}
                    />
                  </Stack>
                  <Stack spacing={0} align="center">
                    <Menu.Label>主题</Menu.Label>
                    <SegmentedControl
                      orientation="vertical"
                      value={theme}
                      onChange={changeTheme}
                      data={[
                        { label: "暗色", value: "dracula" },
                        { label: "浅色", value: "vs-light" },
                      ]}
                    />
                  </Stack>
                </Group>
              </Menu.Dropdown>
            </Menu>

            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              onClick={run}
              loading={runBtnLoading}
              leftIcon={<CaretRightIcon />}
            >
              运行
            </Button>
          </Group>
        )}
      </Group>
    </MantineHeader>
  )
}

export default Header
