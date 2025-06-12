import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateNewTransaction } from '@/api/trasaction/create-new-transaction'
import { FormMessage } from '@/components/form-message'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mapTransactionTypes, TransactionType } from '@/utils'

const createDepositSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatório'),
  value: z.string().min(1, 'Valor da transação é obrigatório'),
  type: z.nativeEnum(TransactionType)
})

type CreateDepositSchemaType = z.infer<typeof createDepositSchema>

type CreateDepositProps = {
  billId: string
}
export function CreateDeposit({ billId }: CreateDepositProps) {
  const queryClient = useQueryClient()
  const { closeModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateDepositSchemaType>({
    defaultValues: {
      description: '',
      value: '',
      type: TransactionType.DEPOSIT
    },
    resolver: zodResolver(createDepositSchema)
  })

  const { mutateAsync: createDeposit } = useCreateNewTransaction({
    async onSuccess() {
      reset()
      toast.success('Depósito feito com sucesso!')
      closeModal()
    },
    onError() {
      toast.error('Não foi possível realizar o depósito!')
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: ['fetch-wallets-digital']
      })
      await queryClient.invalidateQueries({
        queryKey: ['account']
      })
    }
  })

  async function handleCreateCreateDeposit(data: CreateDepositSchemaType) {
    await createDeposit({
      description: data.description,
      type: TransactionType.DEPOSIT,
      value: data.value,
      billId
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Depósito</DialogTitle>
        <DialogDescription>
          Realizar um novo depósito para a carteira: <strong>tal</strong>
        </DialogDescription>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleCreateCreateDeposit)}
      >
        <div className="space-y-2">
          <Label htmlFor="username">Descrição</Label>
          <Input id="username" type="text" {...register('description')} />
          {errors.description && (
            <FormMessage message={errors.description.message} />
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Tipo da transação</Label>
          <Input
            id="username"
            type="text"
            disabled
            value={mapTransactionTypes(TransactionType.DEPOSIT)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor do depósito</Label>
          <Input id="value" type="text" {...register('value')} />
          {errors.value && <FormMessage message={errors.value.message} />}
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
