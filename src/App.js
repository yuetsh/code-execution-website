import { useRef, useEffect, useState } from "react"
import { Row, PageHeader, Button, Select, Modal, Spin, Tag, InputNumber, message } from 'antd'
import { CaretRightOutlined, CloudDownloadOutlined, PlusOutlined, ReloadOutlined, CopyOutlined } from '@ant-design/icons'
import Editor, { useMonaco } from '@monaco-editor/react'
import { Allotment } from 'allotment'
import download from 'downloadjs'
import './App.css'
import "allotment/dist/style.css"
import themeList from './themelist.json'
import { sources, language, filename } from './templates'
import { createSubmission, getOJProblem } from './api'

const { Option } = Select
message.config({ maxCount: 1 })

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
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontsize") || 20)
  const [languageID, setLanguageID] = useState(localStorage.getItem("language_id") || "50")
  const [status, setStatus] = useState(null)
  const [runBtnLoading, setRunBtnLoading] = useState(false)
  const [header, setHeader] = useState({
    primary: themeList[theme].primary,
    type: themeList[theme].type,
  })

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

  async function handleThemeChange(value) {
    if (["vs-dark", "vs-light"].indexOf(value) !== -1) {
      monaco.editor.setTheme(value)
    } else {
      if (cachedThemes[value]) {
        monaco.editor.defineTheme(value, cachedThemes[value])
        monaco.editor.setTheme(value)
      } else {
        const r = await fetch(`./themes/${themeList[value].file}.json`)
        const data = await r.json()
        monaco.editor.defineTheme(value, data)
        monaco.editor.setTheme(value)
        cachedThemes[value] = data
        localStorage.setItem("themesData", JSON.stringify(cachedThemes))
      }
    }
    localStorage.setItem("theme", value)
    setHeader({ primary: themeList[value].primary, type: themeList[value].type })
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

  function restore() {
    changeLanguage(languageID)
    message.success("代码重置成功")
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

  async function handleRun() {
    setStatus(null)
    setRunBtnLoading(true)
    const content = sourceEditorRef.current.getValue().trim()
    if (!content) return
    stdoutEditorRef.current.setValue("")
    const stdinValue = stdinEditorRef.current.getValue().trim()
    const data = await createSubmission(content, stdinValue, parseInt(languageID))
    stdoutEditorRef.current.setValue(data.output)
    setStatus(data.status)
    setRunBtnLoading(false)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(sourceEditorRef.current.getValue())
      message.success("代码复制成功")
    } catch (e) {
      message.error("代码复制失败")
    }
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
    // eslint-disable-next-line
  }, [monaco])

  return (
    <div style={{ backgroundColor: header.primary }}>
      <PageHeader
        title={<span style={{ color: header.type === "dark" ? "white" : "black" }}>徐越的自测猫</span>}
        extra={[
          <Tag key="status" visible={!!status} color={status && status.id === 3 ? "success" : "warning"}>{status && status.msg}</Tag>,
          <Select disabled={!monaco} key="theme" style={{ width: 160 }} defaultValue={theme} onChange={handleThemeChange}>
            {Object.keys(themeList).map(it => <Option key={it} value={it}>{"主题：" + themeList[it].file}</Option>)}
          </Select>,
          <InputNumber disabled={!monaco} key="font_size" min={14} max={40} step={2}
            value={fontSize} formatter={num => "字号：" + num + "px"} onChange={handleFontSize}
            style={{ width: 100 }}></InputNumber>,
          <Button key="new" icon={<PlusOutlined />} onClick={() => window.open("/", "_blank")}>新建</Button>,
          <Button disabled={!monaco} key="download" onClick={handleDownload} icon={<CloudDownloadOutlined />}>下载</Button>,
          <Button disabled={!monaco} key="restore" icon={<ReloadOutlined />} onClick={restore}>重置</Button>,
          <Button disabled={!monaco} key="copy" onClick={copy} icon={<CopyOutlined />}>复制</Button>,
          <Select disabled={!monaco} key="language" style={{ width: 110 }} defaultValue={languageID} value={languageID} onChange={handleLanguageChange}>
            <Option key="c" value="50">语言：C</Option>
            <Option key="cpp" value="54">语言：C++</Option>
            <Option key="python" value="71">语言：Python</Option>
            <Option key="java" value="62">语言：Java</Option>
          </Select>,
          <Button disabled={!monaco} key="run" type="primary" onClick={handleRun} loading={runBtnLoading} icon={<CaretRightOutlined />}>运行</Button>
        ]} />
      <Row className="content">
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
    </div>
  )
}

export default App
