import { useState, useRef } from 'react'
import { createContainer } from 'unstated-next'
import { useMonaco } from '@monaco-editor/react'
import { Modal, message } from 'antd'
import { createSubmission, getOJProblem } from './api'
import { sources } from './assets/templates'
import themeList from './assets/themelist.json'

function useStore() {
  const monaco = useMonaco()
  const theme = localStorage.getItem("theme") || "vs-dark"

  let isEditorDirty = false

  let cachedThemes = {}
  if (localStorage.getItem("themesData")) {
    cachedThemes = JSON.parse(localStorage.getItem("themesData"))
  }

  const sourceEditorRef = useRef(null)
  const stdinEditorRef = useRef(null)
  const stdoutEditorRef = useRef(null)


  const [fontSize, setFontSize] = useState(localStorage.getItem("fontsize") || 24)
  const [languageID, setLanguageID] = useState(localStorage.getItem("language_id") || "50")
  const [status, setStatus] = useState(null)
  const [runBtnLoading, setRunBtnLoading] = useState(false)
  const [header, setHeader] = useState({
    primary: themeList[theme].primary,
    type: themeList[theme].type,
  })
  const [live2dID, setLive2dID] = useState(localStorage.getItem("live2d_id") || "-1")
  const config = {
    fontSize,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: "off",
    autoIndent: true,
    tabSize: 4
  }

  function sourceEditorDidMount(editor) {
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

  function stdinEditorDidMount(editor) {
    stdinEditorRef.current = editor
    editor.updateOptions(config)
    const { input, id } = getOJProblem()
    if (input && id) {
      editor.setValue(input)
      changeLanguage(String(id))
    }
  }

  function stdoutEditorDidMount(editor) {
    stdoutEditorRef.current = editor
    editor.updateOptions({ ...config, readOnly: true })
  }

  function changeFontSize(value) {
    setFontSize(value)
    sourceEditorRef.current.updateOptions({ fontSize: value })
    stdinEditorRef.current.updateOptions({ fontSize: value })
    stdoutEditorRef.current.updateOptions({ fontSize: value })
    localStorage.setItem("fontsize", value)
  }

  async function changeTheme(value) {
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

  function switchLanguage(value) {
    isEditorDirty = sourceEditorRef.current.getValue() !== sources[parseInt(languageID)]
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

  function changeSource(value) {
    isEditorDirty = value !== sources[parseInt(languageID)]
    if (isEditorDirty) {
      localStorage.setItem("code_record", value)
    } else {
      localStorage.removeItem("code_record")
    }
  }

  async function run() {
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

  function changeLive2d() {
    setLive2dID(parseInt(live2dID) >= 2 ? '-1' : String(parseInt(live2dID) + 1))
    localStorage.setItem('live2d_id', live2dID)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(sourceEditorRef.current.getValue())
      message.success("代码复制成功")
    } catch (e) {
      message.error("代码复制失败")
    }
  }


  return {
    monaco,
    theme,
    fontSize,
    languageID,
    status,
    runBtnLoading,
    header,
    live2dID,
    sourceEditorDidMount,
    stdinEditorDidMount,
    stdoutEditorDidMount,
    changeFontSize,
    changeTheme,
    restore,
    switchLanguage,
    changeSource,
    run,
    changeLive2d,
    copy
  }
}

export default createContainer(useStore)