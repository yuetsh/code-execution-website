export const monacoConfig = {
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  tabSize: 4,
  lineNumbersMinChars: 3,
  lineDecorationsWidth: 0,
  scrollBeyondLastColumn: 0,
  glyphMargin: false,
  scrollbar: {
    useShadows: false,
    vertical: "hidden",
    horizontal: "hidden",
  },
  overviewRulerLanes: 0,
}

export function unique(arr, key) {
  const res = new Map()
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1))
}

export function getChromeVersion() {
  var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
  return raw ? parseInt(raw[2], 10) : 0
}
