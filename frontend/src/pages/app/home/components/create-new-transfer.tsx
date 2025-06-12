import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateNewTransaction } from '@/api/trasaction/create-new-transaction'
import { useListUsersToTransfer } from '@/api/user/list-users-to-transfer'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { mapTransactionTypes, TransactionType } from '@/utils'

const createTransferSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatório'),
  value: z.string(),
  type: z.nativeEnum(TransactionType),
  destinationId: z.string().min(1, 'Destinatário é obrigatório')
})

type CreateTransferSchemaType = z.infer<typeof createTransferSchema>

type CreateTransferProps = {
  billId: string
}
export function CreateTransfer({ billId }: CreateTransferProps) {
  const { closeModal } = useModal()

  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<CreateTransferSchemaType>({
    defaultValues: {
      description: '',
      value: '',
      type: TransactionType.TRANSFER
    },
    resolver: zodResolver(createTransferSchema)
  })

  const { mutateAsync: createTransfer } = useCreateNewTransaction({
    async onSuccess() {
      reset()
      toast.success('Transferência feita com sucesso!')
      closeModal()
    },
    onError() {
      toast.error('Não foi possível realizar a transferência!')
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: ['fetch-wallets-digital']
      })
    }
  })

  const { data: responseUsersToTransfer } = useListUsersToTransfer()
  const usersToTransfer = useMemo(
    () => (responseUsersToTransfer ? responseUsersToTransfer : []),
    [responseUsersToTransfer]
  )

  async function handleCreateCreateTransfer(data: CreateTransferSchemaType) {
    await createTransfer({
      description: data.description,
      type: TransactionType.TRANSFER,
      value: data.value,
      billId,
      destinationId: '07288038-5c8a-46dc-9a7d-b475d2b58f18'
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Transferência</DialogTitle>
        <DialogDescription>Cadastrar nova carteira</DialogDescription>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleCreateCreateTransfer)}
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
            value={mapTransactionTypes(TransactionType.TRANSFER)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor</Label>
          <Input id="value" type="text" {...register('value')} />
          {errors.value && <FormMessage message={errors.value.message} />}
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="username">Destinatário</Label>
          <Select
            onValueChange={(value) => {
              setValue('destinationId', value)
            }}
            value={watch('destinationId')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o destinatário" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Destinatários</SelectLabel>
                {usersToTransfer.map(({ name, id }) => (
                  <SelectItem value={id}>{name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.destinationId && (
            <FormMessage message={errors.destinationId.message} />
          )}
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
