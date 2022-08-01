import { useEffect, useState, useCallback } from 'react'

export const monacoConfig = {
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: "off",
    autoIndent: true,
    tabSize: 4,
}

export function useWindowWidth() {
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