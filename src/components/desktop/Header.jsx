import { PageHeader, Button, Select, InputNumber } from 'antd'
import { useSnapshot } from 'valtio'
import { useMonaco } from '@monaco-editor/react'
import { CaretRightOutlined } from '@ant-design/icons'
import themeList from '../../assets/themelist.json'
import { state, onFontSize, onTheme, onRestore, onLanguage, onLive2d, copy, run } from '../../store'

const { Option } = Select

function Header() {

  const {
    theme,
    fontSize,
    languageID,
    runBtnLoading,
    header
  } = useSnapshot(state)

  const monaco = useMonaco()

  return (
    <PageHeader
      title={<span style={{ color: header.type === "dark" ? "white" : "black" }}>徐越的自测猫</span>}
      extra={[
        <Select disabled={!monaco} key="theme" style={{ width: 160 }} value={theme} onChange={val => onTheme(monaco, val)}>
          {Object.keys(themeList).map(it => <Option key={it} value={it}>{"主题：" + themeList[it].file}</Option>)}
        </Select>,
        <InputNumber disabled={!monaco} key="font_size" min={14} max={40} step={2}
          value={fontSize} formatter={num => "字号：" + num + "px"} onChange={onFontSize}
          style={{ width: 100 }} />,
        <Button key="live2d" onClick={onLive2d}>看板娘</Button>,
        <Button disabled={!monaco} key="restore" onClick={onRestore}>重置</Button>,
        <Button disabled={!monaco} key="copy" onClick={copy}>复制</Button>,
        <Select disabled={!monaco} key="language" style={{ width: 110 }} value={languageID} onChange={onLanguage}>
          <Option key="c" value="50">语言：C</Option>
          <Option key="cpp" value="54">语言：C++</Option>
          <Option key="python" value="71">语言：Python</Option>
          <Option key="java" value="62">语言：Java</Option>
        </Select>,
        <Button disabled={!monaco} key="run" type="primary" onClick={run} loading={runBtnLoading} icon={<CaretRightOutlined />}>运行(F5)</Button>
      ]} />
  )
}

export default Header