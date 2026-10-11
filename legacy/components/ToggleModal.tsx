type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const ToggleModal = ({ open, onClose, children }: Props) => {
  if (!open) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

const styles: any = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '80px',
    zIndex: 200,
    animation: 'fadeIn 0.25s ease'
  },
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '720px',
    borderRadius: '16px',
    padding: '24px',
    animation: 'slideDown 0.3s ease'
  }
}

export default ToggleModal
