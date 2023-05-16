import { proxy } from "valtio"
import copyText from "copy-text-to-clipboard"
import { createSubmission, getOJProblem, getSourceCode } from "./api"
import { language, sources } from "./assets/templates"
import themeList from "./assets/themelist.json"

let sourceEditorRef = null

const TOTAL_GIRLS = 7

let cachedThemes = {}

if (localStorage.getItem("themes")) {
  cachedThemes = JSON.parse(localStorage.getItem("themes"))
}

const defaultTheme = localStorage.getItem("theme") || "vs-light"

export const state = proxy({
  sourceValue: "",
  stdinValue: "输入信息",
  stdoutValue: "运行结果",
  theme: defaultTheme,
  fontSize: 24,
  languageID: getSourceCode().id || localStorage.getItem("language_id") || "50",
  runBtnLoading: false,
  primary: themeList[defaultTheme].primary,
  accent: themeList[defaultTheme].accent,
  live2dID: localStorage.getItem("live2d_id") || "-1",
})

export function sourceEditorDidMount(editor) {
  sourceEditorRef = editor
  editor.focus()
  const record = localStorage.getItem("code_" + language[state.languageID])
  const code = getSourceCode()
  state.sourceValue = code.source || record || sources[state.languageID]
  localStorage.setItem("code_" + language[state.languageID], state.sourceValue)
  localStorage.setItem("language_id", state.languageID)
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
  state.primary = themeList[value].primary
  state.accent = themeList[value].accent
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
      localStorage.setItem("themes", JSON.stringify(cachedThemes))
    }
  }
  localStorage.setItem("theme", value)
}

export function onRestore() {
  state.sourceValue = sources[state.languageID]
  localStorage.removeItem("code_" + language[state.languageID])
  state.stdoutValue = "运行结果"
}

export function onLanguage(value) {
  state.languageID = value
  localStorage.setItem("language_id", value)
  const record = localStorage.getItem("code_" + language[value])
  state.sourceValue = record || sources[value]
  localStorage.setItem("code_" + language[value], state.sourceValue)
  state.stdoutValue = "运行结果"
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
  const data = await createSubmission(
    sourceValue,
    stdinValue,
    parseInt(state.languageID)
  )
  state.stdoutValue = data.output || ""
  state.runBtnLoading = false
}

export function onLive2d() {
  const idString =
    parseInt(state.live2dID) >= TOTAL_GIRLS - 1
      ? "-1"
      : String(parseInt(state.live2dID) + 1)
  state.live2dID = idString
  localStorage.setItem("live2d_id", idString)
}

export function onHelper(command) {
  return function () {
    sourceEditorRef.trigger("keyboard", "type", { text: command })
    const position = sourceEditorRef.getPosition()
    if (
      ["<>", "()", '""', "''", "[]", "input()", "print()"].indexOf(command) !==
      -1
    ) {
      sourceEditorRef.setPosition({
        column: position.column - 1,
        lineNumber: position.lineNumber,
      })
    }
    if (['scanf("");', 'printf("");'].indexOf(command) !== -1) {
      sourceEditorRef.setPosition({
        column: position.column - 3,
        lineNumber: position.lineNumber,
      })
    }
    sourceEditorRef.focus()
  }
}

export function copy() {
  copyText(state.sourceValue)
}
