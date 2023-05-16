import qs from "query-string"
import axios from "axios"
import { deadResults, CJN } from "./assets/templates"
import { isLowVersion } from "./utils"

const prefix = isLowVersion ? "http" : "https"

const http = axios.create({ baseURL: prefix + "://judge0api.hyyz.izhai.net" })

function encode(string) {
  return window.btoa(
    String.fromCharCode(...new TextEncoder().encode(string ?? ""))
  )
}

function decode(bytes) {
  const latin = window.atob(bytes ?? "")
  return new TextDecoder("utf-8").decode(
    Uint8Array.from({ length: latin.length }, (_, index) =>
      latin.charCodeAt(index)
    )
  )
}

export async function createSubmission(code, stdin, id) {
  const encodedCode = encode(code)
  id = parseInt(id)
  if (encodedCode === deadResults[id].encoded) {
    return deadResults[id].result
  } else {
    let compilerOptions = ""
    if (id === 50) compilerOptions = "-lm" // 解决 GCC 的链接问题
    const payload = {
      source_code: encodedCode,
      language_id: id,
      stdin: encode(stdin),
      redirect_stderr_to_stdout: true,
      compiler_options: compilerOptions,
    }
    try {
      const response = await http.post("/submissions", payload, {
        params: { base64_encoded: true, wait: true },
      })
      const data = response.data
      return {
        status: data.status && data.status.id,
        output: [decode(data.compile_output), decode(data.stdout)]
          .join("\n")
          .trim(),
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export function getOJProblem() {
  const query = qs.parse(window.location.search)
  if (!query.stdin) return ""
  try {
    return JSON.parse(decodeURIComponent(window.atob(query.stdin)))
  } catch (e) {
    return ""
  }
}

export function getSourceCode() {
  const query = qs.parse(window.location.search)
  if (!query.cjn) return ""
  const code = parseInt(query.cjn, 10)
  // 只有 python
  return { source: CJN[code], id: "71" }
}
