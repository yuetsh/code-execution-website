import {
  Header as MantineHeader,
  Button,
  Select,
  Title,
  Group,
  NumberInput,
  CopyButton,
  useMantineColorScheme,
} from "@mantine/core"
import { useSnapshot } from "valtio"
import { useMonaco } from "@monaco-editor/react"
import themeList from "../../assets/themelist.json"
import CaretRightIcon from "../shared/CaretRightIcon"
import {
  state,
  onFontSize,
  onTheme,
  onRestore,
  onLanguage,
  onLive2d,
  run,
} from "../../store"

function Header() {
  const {
    theme,
    fontSize,
    languageID,
    runBtnLoading,
    primary,
    accent,
    sourceValue,
  } = useSnapshot(state)

  const monaco = useMonaco()
  const { toggleColorScheme } = useMantineColorScheme()

  function changeTheme(value) {
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
        <Title order={3} style={{ color: accent }}>
          徐越的自测猫
        </Title>
        {monaco && (
          <Group spacing="xs">
            <Select
              value={theme}
              onChange={changeTheme}
              data={Object.keys(themeList).map((it) => ({
                value: it,
                label: `主题：${themeList[it].file}`,
              }))}
            />
            <NumberInput
              min={20}
              max={40}
              step={2}
              value={fontSize}
              formatter={(num) => `字号：${num}px`}
              onChange={onFontSize}
              style={{ width: 140 }}
            />
            <Button variant="default" onClick={onLive2d}>
              看板娘
            </Button>
            <Button variant="default" onClick={onRestore}>
              重置
            </Button>
            <CopyButton value={sourceValue}>
              {({ copied, copy }) => (
                <Button variant="default" onClick={copy}>
                  {copied ? "成功" : "复制"}
                </Button>
              )}
            </CopyButton>
            <Select
              value={languageID}
              onChange={onLanguage}
              data={[
                { value: "50", label: "语言：C" },
                { value: "54", label: "语言：C++" },
                { value: "71", label: "语言：Python" },
                { value: "62", label: "语言：Java" },
              ]}
              style={{ width: 140 }}
            />
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              leftIcon={<CaretRightIcon />}
              onClick={run}
              loading={runBtnLoading}
            >
              运行(F5)
            </Button>
          </Group>
        )}
      </Group>
    </MantineHeader>
  )
}

export default Header
