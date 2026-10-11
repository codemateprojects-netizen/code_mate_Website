import { useCallback, useState } from 'react'

/** Returns a callback ref and the element's current content width (0 until measured). */
export function useElementWidth<T extends HTMLElement>() {
  const [width, setWidth] = useState(0)
  const ref = useCallback((node: T | null) => {
    if (!node) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    ro.observe(node)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}
