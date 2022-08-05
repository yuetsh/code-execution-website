import React from 'react'
import { Button, Row } from 'antd'
import { useSnapshot } from 'valtio'
import { state, onHelper } from '../../store'
import { language } from '../../assets/templates'

function PythonHelper() {
  return (
    <Row>
      <Button onClick={onHelper('\t')}>Tab</Button>
      <Button onClick={onHelper('()')}>{"( )"}</Button>
      <Button onClick={onHelper('""')}>{"\" \""}</Button>
      <Button onClick={onHelper('\'\'')}>{"' '"}</Button>
      <Button onClick={onHelper(' = ')}>{'='}</Button>
      <Button onClick={onHelper('input()')}>输入</Button>
      <Button onClick={onHelper('print()')}>输出</Button>
    </Row>
  )
}

function CHelper() {
  return (
    <Row>
      <Button onClick={onHelper('\t')}>Tab</Button>
      <Button onClick={onHelper(',')}>{","}</Button>
      <Button onClick={onHelper(';')}>{";"}</Button>
      <Button onClick={onHelper('<>')}>{"< >"}</Button>
      <Button onClick={onHelper('()')}>{"( )"}</Button>
      <Button onClick={onHelper('[]')}>{"[ ]"}</Button>
      <Button onClick={onHelper('{\n')}>{"{ }"}</Button>
      <Button onClick={onHelper('""')}>{"\" \""}</Button>
      <Button onClick={onHelper('\'\'')}>{"' '"}</Button>
      <Button onClick={onHelper('%d')}>%d</Button>
      <Button onClick={onHelper('%f')}>%f</Button>
      <Button onClick={onHelper('%s')}>%s</Button>
      <Button onClick={onHelper('&')}>{'&'}</Button>
      <Button onClick={onHelper(' = ')}>{'='}</Button>
      <Button onClick={onHelper('int ')}>{'int'}</Button>
      <Button onClick={onHelper('float ')}>{'float'}</Button>
      <Button onClick={onHelper('scanf("");')}>输入</Button>
      <Button onClick={onHelper('printf("");')}>输出</Button>
    </Row>
  )
}

function Helper() {
  const { languageID } = useSnapshot(state)
  if (language[languageID] === 'c') {
    return CHelper()
  } else if (language[languageID] === 'python') {
    return PythonHelper()
  }
  return null
}

export default Helper