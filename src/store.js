import { proxy } from 'valtio'
import { Modal, message } from 'antd'
import copyText from 'copy-text-to-clipboard'
import { createSubmission, getOJProblem } from './api'
import { sources } from './assets/templates'
import themeList from './assets/themelist.json'

const TOTAL_GIRLS = 7

let isEditorDirty = false
let cachedThemes = {}

if (localStorage.getItem("themesData")) {
  cachedThemes = JSON.parse(localStorage.getItem("themesData"))
}

const defaultTheme = localStorage.getItem("theme") || "dracula"

export const state = proxy({
  sourceValue: '',
  stdinValue: '输入信息',
  stdoutValue: '输出信息',
  theme: defaultTheme,
  fontSize: 12,
  languageID: localStorage.getItem("language_id") || "50",
  status: null,
  runBtnLoading: false,
  header: {
    primary: themeList[defaultTheme].primary,
    type: themeList[defaultTheme].type,
  },
  live2dID: localStorage.getItem("live2d_id") || "-1",
  showSettings: false
})

function changeLanguage(idString) {
  state.languageID = idString
  state.sourceValue = sources[parseInt(idString)]
  localStorage.setItem("language_id", idString)
  localStorage.removeItem("code_record")
}

export function sourceEditorDidMount(editor) {
  editor.focus()
  const codeRecord = localStorage.getItem("code_record") || ""
  if (codeRecord) {
    state.sourceValue = codeRecord
  } else {
    state.sourceValue = sources[parseInt(state.languageID)]
  }
}

export function stdinEditorDidMount() {
  const { input, id } = getOJProblem()
  if (input && id) {
    state.stdinValue = input
    state.languageID = String(id)
    localStorage.setItem("language_id", String(id))
  }
}

export function onFontSize(value) {
  state.fontSize = value
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
  isEditorDirty = state.sourceValue !== sources[parseInt(state.languageID)]
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
  state.sourceValue = value
  localStorage.setItem("code_record", value)
}

export function onStdin(value) {
  state.stdinValue = value
}

export async function run() {
  state.status = null
  state.runBtnLoading = true
  const sourceValue = state.sourceValue.trim()
  if (!sourceValue) return
  state.stdoutValue = ""
  const stdinValue = state.stdinValue.trim()
  const data = await createSubmission(sourceValue, stdinValue, parseInt(state.languageID))
  state.stdoutValue = data.output
  state.status = data.status
  state.runBtnLoading = false
}

export function onLive2d() {
  const idString = parseInt(state.live2dID) >= TOTAL_GIRLS - 1 ? '-1' : String(parseInt(state.live2dID) + 1)
  state.live2dID = idString
  localStorage.setItem('live2d_id', idString)
}

export function copy() {
  copyText(state.sourceValue)
  message.success("代码复制成功")
}

export function toggleSettings() {
  state.showSettings = !state.showSettings
}