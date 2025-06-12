import { ContentPage } from '@/components/content-page'
import { Modal } from '@/components/modal'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Button } from '@/components/ui/button'

import { Content } from '../_layout/content'
import { Header } from '../_layout/header'
import { CreateNewWalletDigital } from './components/create-new-wallet-digital'
import { Transactions } from './components/transactions'
import { WalletsDigital } from './components/wallets-digital'

export function Home() {
  const { openModal } = useModal()

  return (
    <ContentPage titlePage="Home">
      <Header>
        <h2 className="mb-2 text-xl font-semibold">Minhas Carteiras</h2>
        <Button
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          onClick={() => {
            openModal('CreateNewWalletDigital')
          }}
        >
          Adicionar Carteira
        </Button>
      </Header>
      <Content>
        <WalletsDigital />
        <Transactions />
      </Content>
      <Modal modal="CreateNewWalletDigital">
        <CreateNewWalletDigital />
      </Modal>
    </ContentPage>
  )
}
