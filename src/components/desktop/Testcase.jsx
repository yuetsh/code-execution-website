import React, { useState } from "react"
import {
  Textarea,
  Group,
  Stack,
  Button,
  CloseButton,
  LoadingOverlay,
} from "@mantine/core"
import { useSnapshot } from "valtio"
import { downloadZip } from "client-zip"
import { saveAs } from "file-saver"
import { createSubmission } from "../../api"
import { state } from "../../store"
import { unique } from "../../utils"

function Testcase({ files, setFiles, clear }) {
  const [loading, setLoading] = useState(false)
  const { languageID, sourceValue } = useSnapshot(state)

  async function download(files) {
    files = unique(files, "in")
    const data = []
    for (let i = 0; i < files.length; i++) {
      if (files[i].out) {
        data.push({
          name: `${i + 1}.in`,
          input: files[i].in,
          lastModified: new Date(),
        })
        data.push({
          name: `${i + 1}.out`,
          input: files[i].out,
          lastModified: new Date(),
        })
      }
    }
    if (!data.length) return
    const blob = await downloadZip(data).blob()
    saveAs(blob, "testcase.zip")
  }

  return (
    <Stack>
      <LoadingOverlay visible={loading} />
      <Group position="right">
        <Button variant="default" onClick={clear}>
          还原
        </Button>
        <Button
          variant="default"
          onClick={() => {
            const newFiles = [...files, { in: "", out: "" }]
            setFiles(newFiles)
          }}
        >
          增加
        </Button>
        <Button variant="default" onClick={() => download(files)}>
          下载
        </Button>
        <Button
          onClick={async () => {
            setLoading(true)
            const requests = files.map((file) =>
              createSubmission(sourceValue, file.in, languageID)
            )
            const responses = await Promise.all(requests)
            setLoading(false)
            let failed = false
            const newFiles = responses.map((r) => {
              if (r.status !== 3) {
                failed = true
              }
              return {
                out: r.output,
                error: r.status !== 3,
              }
            })
            files.forEach((file, index) => {
              newFiles[index].in = file.in
            })
            setFiles(newFiles)
            if (failed) return
            download(newFiles)
          }}
        >
          生成结果并下载
        </Button>
      </Group>
      {files.map((file, index) => (
        <Group key={index} align="flex-start">
          <CloseButton
            disabled={files.length === 1}
            onClick={() => {
              const newFiles = files.filter((_, i) => i !== index)
              setFiles(newFiles)
            }}
          />
          <Textarea
            label={`${index + 1}.in`}
            placeholder="请输入..."
            value={file.in}
            onChange={(event) => {
              const newFiles = files.map((item, i) => {
                if (i === index) {
                  item.in = event.currentTarget.value
                }
                return item
              })
              setFiles(newFiles)
            }}
          />
          <Textarea
            error={file.error}
            label={`${index + 1}.out`}
            placeholder="请输入或者批量生成..."
            value={file.out}
            onChange={(event) => {
              const newFiles = files.map((item, i) => {
                if (i === index) {
                  item.out = event.currentTarget.value
                }
                return item
              })
              setFiles(newFiles)
            }}
          />
        </Group>
      ))}
    </Stack>
  )
}

export default Testcase
