import React from 'react'
import { Button, PageHeader, Modal, Radio, Row, Space } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useSnapshot } from 'valtio'
import { language } from '../../assets/templates'
import { state, run, onTheme, onRestore, toggleSettings, onLanguage, copy } from '../../store'
import { useMonaco } from '@monaco-editor/react'

function Header() {
  const { header, status, runBtnLoading, theme, showSettings, languageID } = useSnapshot(state)
  const monaco = useMonaco()

  return (
    <React.Fragment>
      <PageHeader title={<span style={{ color: header.type === "dark" ? "white" : "black" }}>徐越的自测猫</span>} extra={[
        <Button disabled={!monaco} key="settings" onClick={toggleSettings}>设置</Button>,
        <Button disabled={!monaco} key="run" type="primary" onClick={run} loading={runBtnLoading} icon={<CaretRightOutlined />}>运行 {language[languageID].toUpperCase()}</Button>
      ]} />
      <Modal visible={showSettings} onCancel={toggleSettings} footer={null}>
        <Space direction="vertical">
          <Row align="middle">
            <span>语言：</span>
            <Radio.Group size="large" value={languageID} buttonStyle="solid" onChange={e => onLanguage(e.target.value)}>
              <Radio.Button value="50" style={{ width: 44, textAlign: 'center' }}>C</Radio.Button>
              <Radio.Button value="54">C++</Radio.Button>
              <Radio.Button value="71">Python</Radio.Button>
              <Radio.Button value="62">Java</Radio.Button>
            </Radio.Group>
          </Row>
          <Row align="middle">
            <span>主题：</span>
            <Radio.Group size="large" value={theme} buttonStyle="solid" onChange={e => onTheme(monaco, e.target.value)}>
              <Radio.Button value="vs-light">浅色</Radio.Button>
              <Radio.Button value="dracula">暗色</Radio.Button>
            </Radio.Group>
          </Row>
          <Row align="middle">
            <span>代码：</span>
            <Space>
              <Button size="large" disabled={!monaco} onClick={onRestore}>重置</Button>
              <Button size="large" disabled={!monaco} onClick={copy}>复制</Button>
            </Space>
          </Row>
        </Space>
      </Modal>
    </React.Fragment>
  )
}

export default Header