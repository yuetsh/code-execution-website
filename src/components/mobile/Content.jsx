import React from 'react'
import { useSnapshot } from 'valtio'
import { Spin } from 'antd'
import Editor from '@monaco-editor/react'
import styles from './Content.module.css'
import { state, sourceEditorDidMount, stdinEditorDidMount, stdoutEditorDidMount, onSource } from '../../store'
import { language } from '../../assets/templates'

function Content() {
    const { languageID } = useSnapshot(state)
    return (
        <div className={styles.content}>
            <Editor
                defaultLanguage={language[languageID]}
                language={language[languageID]}
                onMount={sourceEditorDidMount}
                onChange={onSource}
                loading={<Spin />}
            />
            <Editor
                defaultLanguage="plaintext"
                defaultValue="输入信息"
                onMount={stdinEditorDidMount}
                loading={<Spin />}
            />
            <Editor
                defaultLanguage="plaintext"
                defaultValue="输出信息"
                onMount={stdoutEditorDidMount}
                loading={<Spin />}
            />
        </div>
    )
}

export default Content