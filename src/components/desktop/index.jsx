import React, { useEffect, useState, lazy, Suspense } from "react"
import { AppShell, Modal } from "@mantine/core"
import { getHotkeyHandler } from "@mantine/hooks"
import "allotment/dist/style.css"
import Header from "./Header"
import Content from "./Content"
import Live2d from "./Live2d"
import Testcase from "./Testcase"
import { run } from "../../store"

function Desktop() {
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    const preventBrowserShortcut = getHotkeyHandler([
      ["mod+s", () => {}, { preventDefault: true }],
      ["mod+r", () => {}, { preventDefault: true }],
      ["F5", run, { preventDefault: true }],
      ["shift+mod+p", () => setOpened(true), { preventDefault: true }],
    ])
    window.addEventListener("keydown", preventBrowserShortcut)
    return () => window.removeEventListener("keydown", preventBrowserShortcut)
  }, [])

  const initialFiles = Array.from({ length: 5 }, () => ({
    in: "",
    out: "",
    error: false,
  }))
  const [files, setFiles] = useState(initialFiles)

  return (
    <AppShell header={<Header />} padding="0">
      <Content />
      <Live2d />
      <Modal
        closeOnClickOutside={false}
        size="480"
        opened={opened}
        onClose={() => setOpened(false)}
        title="测试用例文件生成器"
      >
        <Testcase
          files={files}
          setFiles={setFiles}
          clear={() => setFiles(initialFiles)}
        />
      </Modal>
    </AppShell>
  )
}

export default Desktop
