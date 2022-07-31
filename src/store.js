import { proxy } from 'valtio'
import { Modal, message } from 'antd'
import copyText from 'copy-text-to-clipboard'
import { createSubmission, getOJProblem } from './api'
import { sources } from './assets/templates'
import themeList from './assets/themelist.json'

let sourceEditorRef = null
let stdinEditorRef = null
let stdoutEditorRef = null

const TOTAL_GIRLS = 7

let isEditorDirty = false
let cachedThemes = {}

if (localStorage.getItem("themesData")) {
  cachedThemes = JSON.parse(localStorage.getItem("themesData"))
}

export const state = proxy({
  theme: localStorage.getItem("theme") || "vs-dark",
  fontSize: localStorage.getItem("fontsize") || window.innerWidth > 800 ? 24 : 16,
  languageID: localStorage.getItem("language_id") || "50",
  status: null,
  runBtnLoading: false,
  header: {
    primary: themeList[localStorage.getItem("theme") || "vs-dark"].primary,
    type: themeList[localStorage.getItem("theme") || "vs-dark"].type,
  },
  live2dID: localStorage.getItem("live2d_id") || "-1",
  showSettings: false
})

const config = {
  fontSize: state.fontSize,
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  lineNumbers: "off",
  autoIndent: true,
  tabSize: 4,
}

function changeLanguage(idString) {
  state.languageID = idString
  sourceEditorRef.setValue(sources[parseInt(idString)])
  localStorage.setItem("language_id", idString)
  localStorage.removeItem("code_record")
}

export function sourceEditorDidMount(editor) {
  sourceEditorRef = editor
  editor.focus()
  editor.updateOptions({
    ...config,
    scrollBeyondLastLine: true,
    lineNumbers: "on"
  })
  const codeRecord = localStorage.getItem("code_record") || ""
  if (codeRecord) {
    sourceEditorRef.setValue(codeRecord)
  } else {
    sourceEditorRef.setValue(sources[parseInt(state.languageID)])
  }
}

export function stdinEditorDidMount(editor) {
  stdinEditorRef = editor
  editor.updateOptions(config)
  const { input, id } = getOJProblem()
  if (input && id) {
    editor.setValue(input)
    changeLanguage(String(id))
  }
}

export function stdoutEditorDidMount(editor) {
  stdoutEditorRef = editor
  editor.updateOptions({ ...config, readOnly: true })
}

export function onFontSize(value) {
  state.fontSize = value
  sourceEditorRef.updateOptions({ fontSize: value })
  stdinEditorRef.updateOptions({ fontSize: value })
  stdoutEditorRef.updateOptions({ fontSize: value })
  localStorage.setItem("fontsize", value)
}

export async function onTheme(monaco, value) {
  state.theme = value
  if (["vs-dark", "vs-light"].indexOf(value) !== -1) {
    monaco.editor.setTheme(value)
  } else {
    if (cachedThemes[value]) {
      monaco.editor.defineTheme(value, cachedThemes[value])
      monaco.editor.setTheme(value)
    } else {
      const r = await fetch(`/themes/${themeList[value].file}.json`)
      const data = await r.json()
      monaco.editor.defineTheme(value, data)
      monaco.editor.setTheme(value)
      cachedThemes[value] = data
      localStorage.setItem("themesData", JSON.stringify(cachedThemes))
    }
  }
  localStorage.setItem("theme", value)
  state.header = { primary: themeList[value].primary, type: themeList[value].type }
}

export function onRestore() {
  changeLanguage(state.languageID)
  message.success("代码重置成功")
}

export function onLanguage(value) {
  isEditorDirty = sourceEditorRef.getValue() !== sources[parseInt(state.languageID)]
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

export function onSource(value) {
  isEditorDirty = value !== sources[parseInt(state.languageID)]
  if (isEditorDirty) {
    localStorage.setItem("code_record", value)
  } else {
    localStorage.removeItem("code_record")
  }
}

export async function run() {
  state.status = null
  state.runBtnLoading = true
  const content = sourceEditorRef.getValue().trim()
  if (!content) return
  stdoutEditorRef.setValue("")
  const stdinValue = stdinEditorRef.getValue().trim()
  const data = await createSubmission(content, stdinValue, parseInt(state.languageID))
  stdoutEditorRef.setValue(data.output)
  state.status = data.status
  state.runBtnLoading = false
}

export function onLive2d() {
  const idString = parseInt(state.live2dID) >= TOTAL_GIRLS - 1 ? '-1' : String(parseInt(state.live2dID) + 1)
  state.live2dID = idString
  localStorage.setItem('live2d_id', idString)
}

export function copy() {
  copyText(sourceEditorRef.getValue())
  message.success("代码复制成功")
}

export function toggleSettings() {
  state.showSettings = !state.showSettings
}