import React, { useEffect } from 'react'
import Desktop from "./desktop"
import Mobile from "./mobile"
import { useWindowWidth } from '../utils'
import { state } from '../store'

function App() {
    const width = useWindowWidth()
    state.fontSize = width > 800 ? (localStorage.getItem("fontsize") || 24) : 16
    useEffect(() => {
        state.fontSize = width > 800 ? (localStorage.getItem("fontsize") || 24) : 16
    }, [width])

    if (width > 800) {
        return <Desktop />
    } else {
        return <Mobile />
    }
}

export default App