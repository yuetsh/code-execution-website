import { useState, useCallback, useEffect } from 'react'
import Desktop from "./desktop"
import Mobile from "./mobile"

function useWidth() {
    const [width, setWidth] = useState(null)

    const updateWidth = useCallback(() => {
        if (window) {
            setWidth(window.innerWidth)
        }
    }, [])

    useEffect(() => {
        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [updateWidth])

    return [width]
}

function App() {
    const width = useWidth()
    if (width > 800) {
        return <Desktop />
    } else {
        return <Mobile />
    }
}

export default App