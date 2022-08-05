import React from 'react'
import { Button, Row } from 'antd'
import { onHelper } from '../../store'

function Helper() {
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
      <Button onClick={onHelper('scanf("");')}>输入</Button>
      <Button onClick={onHelper('%d')}>%d</Button>
      <Button onClick={onHelper('%f')}>%f</Button>
      <Button onClick={onHelper('%s')}>%s</Button>
      <Button onClick={onHelper('&')}>{'&'}</Button>
      <Button onClick={onHelper('=')}>{'='}</Button>
      <Button onClick={onHelper('printf("");')}>输出</Button>
    </Row>
  )
}

export default Helper