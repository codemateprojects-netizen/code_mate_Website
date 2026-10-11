import { useSyncExternalStore } from 'react'

/** Shared open/closed state for the mobile menu (header button + bottom tab bar). */
let open = false
const listeners = new Set<() => void>()

export const mobileMenu = {
  set(value: boolean) {
    if (value === open) return
    open = value
    listeners.forEach((l) => l())
  },
  toggle() {
    mobileMenu.set(!open)
  },
}

export function useMobileMenu() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => open,
    () => false,
  )
}
