import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateNewWalletDigital } from '@/api/wallet-digital/create-new-wallet-digital'
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

const createNewWalletDigitalSchema = z.object({
  name: z.string().min(1, 'Nome da carteira é obrigatório.'),
  amount: z.string().min(1, 'Valor inicial é obrigatório')
})

type CreateNewWalletDigitalSchemaType = z.infer<
  typeof createNewWalletDigitalSchema
>

export function CreateNewWalletDigital() {
  const { closeModal } = useModal()

  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateNewWalletDigitalSchemaType>({
    defaultValues: {
      name: '',
      amount: ''
    },
    resolver: zodResolver(createNewWalletDigitalSchema)
  })

  const { mutateAsync: createNewWalletDigital } = useCreateNewWalletDigital({
    async onSuccess() {
      reset()
      toast.success('Carteira criada com sucesso!')
      closeModal()
    },
    onError() {
      toast.error('Não foi possível criar uma carteira!')
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: ['fetch-wallets-digital']
      })
    }
  })

  async function handleCreateNewUser(data: CreateNewWalletDigitalSchemaType) {
    await createNewWalletDigital({
      name: data.name,
      amount: data.amount
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar Carteira Digital</DialogTitle>
        <DialogDescription>Cadastrar nova carteira</DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={handleSubmit(handleCreateNewUser)}>
        <div className="space-y-2">
          <Label htmlFor="username">Nome</Label>
          <Input id="username" type="text" {...register('name')} />
          {errors.name && <FormMessage message={errors.name.message} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Valor Inicial</Label>
          <Input id="amount" type="text" {...register('amount')} />
          {errors.amount && <FormMessage message={errors.amount.message} />}
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
