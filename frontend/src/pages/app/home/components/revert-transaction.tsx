import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useRevertTransaction } from '@/api/trasaction/revert-transaction'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const revertTransactionSchema = z.object({
  transactionId: z.string()
})

type RevertTransactionSchemaType = z.infer<typeof revertTransactionSchema>

type RevertTransactionProps = {
  transactionId: string
}
export function RevertTransaction({ transactionId }: RevertTransactionProps) {
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RevertTransactionSchemaType>({
    defaultValues: {
      transactionId: ''
    },
    resolver: zodResolver(revertTransactionSchema)
  })

  const { mutateAsync: revertTransaction } = useRevertTransaction({
    async onSuccess() {
      toast.success('Transação revertida com sucesso!')
      closeModal()
    },
    onError() {
      toast.error('Não foi possível reverter a transação!')
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: ['fetch-wallets-digital']
      })
      await queryClient.invalidateQueries({
        queryKey: ['account']
      })
      await queryClient.invalidateQueries({
        queryKey: ['fetch-all-transactions']
      })
    }
  })

  const handleRevertTransaction = useCallback(async () => {
    await revertTransaction({ transactionId })
  }, [transactionId])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reverter transação atual</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleRevertTransaction)}
      >
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja reverter esta transação? Essa operação não
            poderá ser desfeita.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
