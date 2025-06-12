import { useQueryClient } from '@tanstack/react-query'
import { WalletIcon, XIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { useDeleteWalletDigital } from '@/api/wallet-digital/delete-wallet-digital'
import { useFetchWalletBills } from '@/api/wallet-digital/fetch-all-wallet-digital'
import { Modal } from '@/components/modal'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatMoneyBR } from '@/utils'

import { CreateDeposit } from './create-new-deposit'
import { CreateTransfer } from './create-new-transfer'

export function WalletsDigital() {
  const queryClient = useQueryClient()
  const [billId, setBillId] = useState<string>('')

  const { openModal } = useModal()

  const { mutateAsync: deleteWalletDigital } = useDeleteWalletDigital({
    onError() {
      toast.error('Não foi possível excluir a carteira!')
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: ['fetch-wallets-digital']
      })
    }
  })

  const { data: responseWalletBills } = useFetchWalletBills()
  const walletBills = useMemo(
    () => (responseWalletBills ? responseWalletBills.walletsDigital : []),
    [responseWalletBills]
  )

  return (
    <section className="flex flex-row flex-wrap gap-4">
      {walletBills.map((wallet) => {
        return (
          <Card key={wallet.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base font-semibold">
                  {wallet.name}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                className="hover:bg-red-50"
                onClick={() => {
                  deleteWalletDigital({ billId: wallet.id })
                }}
              >
                <XIcon className="text-red-400" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-xs text-muted-foreground">Total</p>
              <span className="text-2xl font-bold tracking-tighter">
                {formatMoneyBR(wallet.amount)}
              </span>
            </CardContent>
            <CardFooter className="mb-4 flex w-[445px] gap-4">
              <button
                className="flex-1 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                onClick={() => {
                  setBillId(wallet.id)
                  openModal('Transfer')
                }}
              >
                Realizar Transferência
              </button>
              <button
                className="flex-1 rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                onClick={() => {
                  setBillId(wallet.id)
                  openModal('Deposit')
                }}
              >
                Realizar Depósito
              </button>
            </CardFooter>
          </Card>
        )
      })}
      <Modal modal="Transfer">
        <CreateTransfer billId={billId} />
      </Modal>
      <Modal modal="Deposit">
        <CreateDeposit billId={billId} />
      </Modal>
    </section>
  )
}
