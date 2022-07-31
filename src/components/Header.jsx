import { PageHeader, Button, Select, Tag, InputNumber } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import store from '../store'
import themeList from '../assets/themelist.json'

const { Option } = Select

function Header() {

  const {
    monaco,
    theme,
    fontSize,
    languageID,
    status,
    runBtnLoading,
    header,
    changeFontSize,
    changeTheme,
    restore,
    switchLanguage,
    changeLive2d,
    copy,
    run,
  } = store.useContainer()

  return (
    <PageHeader
      title={<span style={{ color: header.type === "dark" ? "white" : "black" }}>徐越的自测猫</span>}
      extra={[
        <Tag key="status" visible={!!status} color={status && status.id === 3 ? "success" : "warning"}>{status && status.msg}</Tag>,
        <Select disabled={!monaco} key="theme" style={{ width: 160 }} defaultValue={theme} onChange={changeTheme}>
          {Object.keys(themeList).map(it => <Option key={it} value={it}>{"主题：" + themeList[it].file}</Option>)}
        </Select>,
        <InputNumber disabled={!monaco} key="font_size" min={14} max={40} step={2}
          value={fontSize} formatter={num => "字号：" + num + "px"} onChange={changeFontSize}
          style={{ width: 100 }} />,
        <Button key="live2d" onClick={changeLive2d}>看板娘</Button>,
        <Button disabled={!monaco} key="restore" onClick={restore}>重置</Button>,
        <Button disabled={!monaco} key="copy" onClick={copy}>复制</Button>,
        <Select disabled={!monaco} key="language" style={{ width: 110 }} defaultValue={languageID} value={languageID} onChange={switchLanguage}>
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