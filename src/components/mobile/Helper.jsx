import React from "react"
import { Button, SimpleGrid } from "@mantine/core"
import { useSnapshot } from "valtio"
import { state, onHelper } from "../../store"
import { language } from "../../assets/templates"

function PythonHelper() {
  return (
    <>
      <Button size="xs" variant="subtle" onClick={onHelper("\t")}>
        Tab
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(":")}>
        {":"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("()")}>
        {"( )"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("[]")}>
        {"[ ]"}
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
      <Button size="xs" variant="subtle" onClick={onHelper(" > ")}>
        {">"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" >= ")}>
        {">="}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" < ")}>
        {"<"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" <= ")}>
        {"<="}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("is")}>
        is
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("not")}>
        not
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("input()")}>
        输入
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("print()")}>
        输出
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("if ")}>
        if
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("else:")}>
        else
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("for ")}>
        for
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("in ")}>
        in
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("True")}>
        True
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("False")}>
        False
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("\n")}>
        换行
      </Button>
    </>
  )
}

function CHelper() {
  return (
    <>
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
      <Button size="xs" variant="subtle" onClick={onHelper(" > ")}>
        {">"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" >= ")}>
        {">="}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" < ")}>
        {"<"}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(" <= ")}>
        {"<="}
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
      <Button size="xs" variant="subtle" onClick={onHelper("\n")}>
        换行
      </Button>
    </>
  )
}

function CppHelper() {
  return (
    <>
      <Button size="xs" variant="subtle" onClick={onHelper("\t")}>
        Tab
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(",")}>
        {","}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper(";")}>
        {";"}
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
      <Button size="xs" variant="subtle" onClick={onHelper(" = ")}>
        {"="}
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper('cout<<""<<endl;')}>
        输入
      </Button>
      <Button size="xs" variant="subtle" onClick={onHelper("cin>>;")}>
        输出
      </Button>
    </>
  )
}

function JavaHelper() {
  return (
    <>
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
      <Button size="xs" variant="subtle" onClick={onHelper(" = ")}>
        {"="}
      </Button>
      <Button
        size="xs"
        variant="subtle"
        onClick={onHelper('System.out.println("");')}
      >
        输出
      </Button>
    </>
  )
}

function Helper() {
  const { languageID } = useSnapshot(state)
  let Comp = null
  switch (language[languageID]) {
    case "c":
      Comp = CHelper()
      break
    case "python":
      Comp = PythonHelper()
      break
    case "java":
      Comp = JavaHelper()
      break
    default:
      Comp = CppHelper()
      break
  }
  return (
    <SimpleGrid cols={5} spacing={0}>
      {Comp}
    </SimpleGrid>
  )
}

export default Helper
