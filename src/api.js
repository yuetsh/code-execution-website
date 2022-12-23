import qs from "query-string"
import axios from "axios"
import { deadResults } from "./assets/templates"

const http = axios.create({ baseURL: "https://judge0api.hyyz.izhai.net" })

function encode(str) {
  return btoa(unescape(encodeURIComponent(str || "")))
}

function decode(bytes) {
  let escaped = escape(atob(bytes || ""))
  try {
    return decodeURIComponent(escaped)
  } catch (e) {
    return unescape(escaped)
  }
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
  const parsed = qs.parse(window.location.search)
  if (!parsed.stdin) return ""
  try {
    return JSON.parse(decodeURIComponent(window.atob(parsed.stdin)))
  } catch (e) {
    return ""
  }
}
