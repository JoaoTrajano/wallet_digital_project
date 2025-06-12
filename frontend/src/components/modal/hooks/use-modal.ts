import { create } from 'zustand'

export type ModalsType =
  | 'CreateNewWalletDigital'
  | 'Transfer'
  | 'Deposit'
  | 'ReverseTransaction'

type ModalStore = {
  isOpen: boolean
  modal: ModalsType | null
  openModal: (modal: ModalsType) => void
  closeModal: () => void
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  modal: null,
  openModal: (modal) => set({ isOpen: true, modal }),
  closeModal: () => set({ isOpen: false, modal: null })
}))
