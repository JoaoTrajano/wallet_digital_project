import { Dialog, DialogContent } from '@/components/ui/dialog'

import type { ModalsType } from './hooks/use-modal'
import { useModal } from './hooks/use-modal'

export type ModalProps = {
  children: React.ReactNode
  modal: ModalsType
  onClose?: () => void
}

export function Modal({ children, modal, onClose }: ModalProps) {
  const { isOpen, modal: currentModal, closeModal } = useModal()

  if (modal !== currentModal) return null

  const handleClose = () => {
    closeModal()
    onClose?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  )
}
