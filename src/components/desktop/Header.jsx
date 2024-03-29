import {
  Header as MantineHeader,
  Button,
  Select,
  Title,
  Group,
  NumberInput,
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
  copy,
} from "../../store"

function Header() {
  const { theme, fontSize, languageID, runBtnLoading, primary, accent } =
    useSnapshot(state)

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
      sx={{ backgroundColor: primary }}
    >
      <Group position="apart" sx={{ height: "100%" }}>
        <Title order={3} sx={{ color: accent }}>
          徐越的自测猫
        </Title>
        {monaco && (
          <Group spacing="xs">
            <Select
              value={theme}
              onChange={changeTheme}
              data={Object.keys(themeList).map((it) => ({
                value: it,
                label: `${themeList[it].file}`,
              }))}
              sx={{ width: 155 }}
            />
            <NumberInput
              min={20}
              max={40}
              step={2}
              value={fontSize}
              formatter={(num) => `字号 ${num}px`}
              onChange={onFontSize}
              sx={{ width: 120 }}
            />
            <Button variant="default" onClick={onLive2d}>
              看板娘
            </Button>
            <Button variant="default" onClick={onRestore}>
              重置
            </Button>
            <Button variant="default" onClick={copy}>
              复制代码
            </Button>
            <Select
              value={languageID}
              onChange={onLanguage}
              data={[
                { value: "50", label: "C" },
                { value: "54", label: "C++" },
                { value: "71", label: "Python" },
                { value: "62", label: "Java" },
              ]}
              sx={{ width: 100 }}
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
