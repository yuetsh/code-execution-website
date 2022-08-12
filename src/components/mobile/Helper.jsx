import React from "react"
import { Button, Row } from "antd"
import { useSnapshot } from "valtio"
import { state, onHelper } from "../../store"
import { language } from "../../assets/templates"
import styles from "./Helper.module.css"

function PythonHelper() {
  return (
    <React.Fragment>
      <Button onClick={onHelper("\t")}>Tab</Button>
      <Button onClick={onHelper("()")}>{"( )"}</Button>
      <Button onClick={onHelper('""')}>{'" "'}</Button>
      <Button onClick={onHelper("''")}>{"' '"}</Button>
      <Button onClick={onHelper(" = ")}>{"="}</Button>
      <Button onClick={onHelper("input()")}>输入</Button>
      <Button onClick={onHelper("print()")}>输出</Button>
    </React.Fragment>
  )
}

function CHelper() {
  return (
    <React.Fragment>
      <Button onClick={onHelper("\t")}>Tab</Button>
      <Button onClick={onHelper(",")}>{","}</Button>
      <Button onClick={onHelper(";")}>{";"}</Button>
      <Button onClick={onHelper("<>")}>{"< >"}</Button>
      <Button onClick={onHelper("()")}>{"( )"}</Button>
      <Button onClick={onHelper("[]")}>{"[ ]"}</Button>
      <Button onClick={onHelper("{\n")}>{"{ }"}</Button>
      <Button onClick={onHelper('""')}>{'" "'}</Button>
      <Button onClick={onHelper("''")}>{"' '"}</Button>
      <Button onClick={onHelper("%d")}>%d</Button>
      <Button onClick={onHelper("%f")}>%f</Button>
      <Button onClick={onHelper("%s")}>%s</Button>
      <Button onClick={onHelper("&")}>{"&"}</Button>
      <Button onClick={onHelper(" = ")}>{"="}</Button>
      <Button onClick={onHelper("int ")}>{"int"}</Button>
      <Button onClick={onHelper("float ")}>{"float"}</Button>
      <Button onClick={onHelper('scanf("");')}>输入</Button>
      <Button onClick={onHelper('printf("");')}>输出</Button>
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
  return <Row className={styles.container}>{Comp}</Row>
}

export default Helper
