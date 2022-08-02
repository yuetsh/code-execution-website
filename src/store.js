import { proxy } from 'valtio'
import { message } from 'antd'
import copyText from 'copy-text-to-clipboard'
import { createSubmission, getOJProblem } from './api'
import { language, sources } from './assets/templates'
import themeList from './assets/themelist.json'

const TOTAL_GIRLS = 7

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
  runBtnLoading: false,
  header: {
    primary: themeList[defaultTheme].primary,
    type: themeList[defaultTheme].type,
  },
  live2dID: localStorage.getItem("live2d_id") || "-1",
  showSettings: false
})

export function sourceEditorDidMount(editor) {
  editor.focus()
  const record = localStorage.getItem('code_' + language[state.languageID])
  state.sourceValue = record || sources[state.languageID]
  localStorage.setItem('code_' + language[state.languageID], state.sourceValue)
  localStorage.setItem('language_id', state.languageID)
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
  state.sourceValue = sources[state.languageID]
  localStorage.removeItem('code_' + language[state.languageID])
  state.stdoutValue = '输出信息'
  message.success("代码重置成功")
}

export function onLanguage(value) {
  state.languageID = value
  localStorage.setItem("language_id", value)
  const record = localStorage.getItem('code_' + language[value])
  state.sourceValue = record || sources[value]
  localStorage.setItem('code_' + language[value], state.sourceValue)
  state.stdoutValue = '输出信息'
}

export function onSource(value) {
  state.sourceValue = value
  localStorage.setItem("code_" + language[state.languageID], value)
}

export function onStdin(value) {
  state.stdinValue = value
}

export async function run() {
  state.runBtnLoading = true
  const sourceValue = state.sourceValue.trim()
  if (!sourceValue) return
  state.stdoutValue = ""
  const stdinValue = state.stdinValue.trim()
  const data = await createSubmission(sourceValue, stdinValue, parseInt(state.languageID))
  state.stdoutValue = data.output
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