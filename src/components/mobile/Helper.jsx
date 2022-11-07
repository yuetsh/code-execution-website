import React from "react"
import { Button, SimpleGrid } from "@mantine/core"
import { useSnapshot } from "valtio"
import { state, onHelper } from "../../store"
import { language } from "../../assets/templates"

function PythonHelper() {
  return (
    <React.Fragment>
      <Button size="xs" variant="subtle" onClick={onHelper("\t")}>
        Tab
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("()")}>
        {"( )"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper('""')}>
        {'" "'}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("''")}>
        {"' '"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" = ")}>
        {"="}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("input()")}>
        输入
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("print()")}>
        输出
      </Button>
    </React.Fragment>
  )
}

function CHelper() {
  return (
    <React.Fragment>
      <Button size="xs" variant="subtle" onClick={onHelper("\t")}>
        Tab
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(",")}>
        {","}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(";")}>
        {";"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("\\n")}>
        {"\\n"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("<>")}>
        {"< >"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("()")}>
        {"( )"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("[]")}>
        {"[ ]"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("{\n")}>
        {"{ }"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper('""')}>
        {'" "'}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("''")}>
        {"' '"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("%d")}>
        %d
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("%f")}>
        %f
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("%s")}>
        %s
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("&")}>
        {"&"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" = ")}>
        {"="}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("int ")}>
        {"int"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("float ")}>
        {"float"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper('scanf("");')}>
        输入
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper('printf("");')}>
        输出
      </Button>
    </React.Fragment>
  )
}

function CppHelper() {
  return <React.Fragment></React.Fragment>
}

function JavaHelper() {
  return <React.Fragment></React.Fragment>
}

function Helper() {
  const { languageID } = useSnapshot(state)
  let Comp = null
  if (language[languageID] === "c") {
    Comp = CHelper()
  } else if (language[languageID] === "python") {
    Comp = PythonHelper()
  }
  return <SimpleGrid cols={4}>{Comp}</SimpleGrid>
}

export default Helper
