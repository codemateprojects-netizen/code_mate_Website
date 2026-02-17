import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

const SearchModal = ({ open, onClose }: Props) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="Search…"
          style={styles.input}
        />

        <div style={styles.footer}>
          <span>Type to search</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  )
}

const styles: any = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '15vh',
    zIndex: 300
  },

  modal: {
    width: '92%',
    maxWidth: '560px',
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    padding: '20px 22px',
    border: '1px solid var(--border-light)'
  },

  input: {
    width: '100%',
    fontSize: '18px',
    padding: '14px 0',
    border: 'none',
    outline: 'none',
    color: 'var(--secondary)'
  },

  footer: {
    marginTop: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12.5px',
    color: 'var(--text-muted)'
  }
}

export default SearchModal
