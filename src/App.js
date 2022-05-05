import { useRef, useEffect, useState } from "react"
import { Row, PageHeader, Button, Select, Modal, Tooltip, Spin, Tag, InputNumber } from 'antd'
import { CaretRightOutlined, CloudDownloadOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import Editor, { useMonaco } from '@monaco-editor/react'
import { Allotment } from 'allotment'
import download from 'downloadjs'
import './App.css'
import "allotment/dist/style.css"
import themeList from './themelist.json'
import { sources, language, filename } from './templates'
import { createSubmission, getOJProblem } from './request'

const { Option } = Select

function App() {
  const monaco = useMonaco()
  let isEditorDirty = false

  let cachedThemes = {}
  if (localStorage.getItem("themesData")) {
    cachedThemes = JSON.parse(localStorage.getItem("themesData"))
  }

  const sourceEditorRef = useRef(null)
  const stdinEditorRef = useRef(null)
  const stdoutEditorRef = useRef(null)

  const theme = localStorage.getItem("theme") || "vs-dark"
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontsize") || 18)
  const [languageID, setLanguageID] = useState(localStorage.getItem("language_id") || "50")
  const [status, setStatus] = useState(null)
  const [runBtnLoading, setRunBtnLoading] = useState(false)

  const config = {
    fontSize,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: "off",
    autoIndent: true,
    tabSize: 4
  }

  function handleSourceEditorDidMount(editor) {
    sourceEditorRef.current = editor
    editor.focus()
    editor.updateOptions({
      ...config,
      scrollBeyondLastLine: true,
      lineNumbers: "on"
    })
    const codeRecord = localStorage.getItem("code_record") || ""
    if (codeRecord) {
      sourceEditorRef.current.setValue(codeRecord)
    } else {
      sourceEditorRef.current.setValue(sources[parseInt(languageID)])
    }
  }

  function handleStdinEditorDidMount(editor) {
    stdinEditorRef.current = editor
    editor.updateOptions(config)
    const { input, id } = getOJProblem()
    if (input && id) {
      editor.setValue(input)
      changeLanguage(String(id))
    }
  }

  function handleStdoutEditorDidMount(editor) {
    stdoutEditorRef.current = editor
    editor.updateOptions({ ...config, readOnly: true })
  }

  function handleFontSize(value) {
    setFontSize(value)
    sourceEditorRef.current.updateOptions({ fontSize: value })
    stdinEditorRef.current.updateOptions({ fontSize: value })
    stdoutEditorRef.current.updateOptions({ fontSize: value })
    localStorage.setItem("fontsize", value)
  }

  function handleThemeChange(value) {
    if (["vs-dark", "vs-light"].indexOf(value) !== -1) {
      monaco.editor.setTheme(value)
    } else {
      if (cachedThemes[value]) {
        monaco.editor.defineTheme(value, cachedThemes[value])
        monaco.editor.setTheme(value)
      } else {
        fetch(`./themes/${themeList[value]}.json`).then(r => r.json()).then(data => {
          monaco.editor.defineTheme(value, data)
          monaco.editor.setTheme(value)
          cachedThemes[value] = data
          localStorage.setItem("themesData", JSON.stringify(cachedThemes))
        })
      }
    }
    localStorage.setItem("theme", value)
  }

  function handleDownload() {
    const codes = sourceEditorRef.current.getValue().trim()
    if (!codes) return
    download(codes, filename[parseInt(languageID)], "text/plain")
  }

  function changeLanguage(idString) {
    setLanguageID(idString)
    sourceEditorRef.current.setValue(sources[parseInt(idString)])
    localStorage.setItem("language_id", idString)
    localStorage.removeItem("code_record")
  }

  function restore(idString) {
    stdinEditorRef.current.setValue("输入信息")
    stdoutEditorRef.current.setValue("输出信息")
    changeLanguage(idString)
  }

  function handleLanguageChange(value) {
    if (isEditorDirty) {
      Modal.confirm({
        title: "警告",
        content: "代码已被你修改过了，切换语言会删掉你写的代码，你确定要切换语言吗？",
        okText: "确定",
        cancelText: "取消",
        maskClosable: true,
        onOk() {
          changeLanguage(value)
        }
      })
    } else {
      changeLanguage(value)
    }
  }

  function handleSourceChange(value) {
    isEditorDirty = value !== sources[parseInt(languageID)]
    if (isEditorDirty) {
      localStorage.setItem("code_record", value)
    } else {
      localStorage.removeItem("code_record")
    }
  }

  function handleRun() {
    setStatus(null)
    setRunBtnLoading(true)
    const content = sourceEditorRef.current.getValue().trim()
    if (!content) return
    stdoutEditorRef.current.setValue("")
    const stdinValue = stdinEditorRef.current.getValue().trim()
    createSubmission(content, stdinValue, parseInt(languageID)).then(data => {
      stdoutEditorRef.current.setValue(data.output)
      setStatus(data.status)
      setRunBtnLoading(false)
    })
  }

  useEffect(() => {
    if (monaco) {
      handleThemeChange(theme)
    }

    window.addEventListener("keydown", e => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault()
            break
          case 'r':
            e.preventDefault()
            break
          default:
            break
        }
      }
    })
  })

  return [
    <PageHeader
      key={1}
      title="黄岩一职代码运行网站"
      extra={[
        <Tag key={0} visible={!!status} color={status && status.id === 3 ? "success" : "warning"}>{status && status.msg}</Tag>,
        <Select disabled={!monaco} key={1} defaultValue={theme} onChange={handleThemeChange}>
          {Object.keys(themeList).map(it => <Option key={it} value={it}>{themeList[it]}</Option>)}
        </Select>,
        <InputNumber disabled={!monaco} key={2} min={14} max={40} step={2} value={fontSize} formatter={num => num + "px"} onChange={handleFontSize} style={{ width: 80 }}></InputNumber>,
        <Button key={3} icon={<PlusOutlined />} onClick={() => window.open("/", "_blank")}>新建</Button>,
        <Button disabled={!monaco} key={4} onClick={handleDownload} icon={<CloudDownloadOutlined />}>下载</Button>,
        <Tooltip key={5} title="会删掉所写代码和输入信息" placement="bottom">
          <Button disabled={!monaco} icon={<ReloadOutlined />} onClick={() => restore(languageID)}>重置</Button>
        </Tooltip>,
        <Select disabled={!monaco} key={6} defaultValue={languageID} value={languageID} onChange={handleLanguageChange}>
          <Option key={1} value="50" mode="c">C (GCC 9.2.0)</Option>
          <Option key={2} value="71" mode="python">Python (3.8.1)</Option>
          <Option key={3} value="62" mode="java">Java (OpenJDK 13.0.1)</Option>
        </Select>,
        <Button disabled={!monaco} key={7} type="primary" onClick={handleRun} loading={runBtnLoading} icon={<CaretRightOutlined />}>运行</Button>
      ]} />,
    <Row className="content" key={2}>
      <Allotment defaultSizes={[2, 1]}>
        <Allotment.Pane>
          <Editor
            defaultLanguage={language[languageID]}
            language={language[languageID]}
            onMount={handleSourceEditorDidMount}
            onChange={handleSourceChange}
            loading={<Spin />}
          />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment vertical>
            <Allotment.Pane>
              <Editor
                defaultLanguage="plaintext"
                defaultValue="输入信息"
                onMount={handleStdinEditorDidMount}
                loading={<Spin />}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <Editor
                defaultLanguage="plaintext"
                defaultValue="输出信息"
                onMount={handleStdoutEditorDidMount}
                loading={<Spin />}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </Row >
  ]
}

export default App
