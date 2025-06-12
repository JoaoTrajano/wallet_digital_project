import { TransactionType } from '@/utils'

interface TransactionProps {
  type: TransactionType
}

export function TransactionTypeLabel({ type }: TransactionProps) {
  return (
    <>
      {type === 'TRANSFER' && (
        <span className="text-red-500">Transferência</span>
      )}
      {type === 'DEPOSIT' && <span className="text-green-500">Depósito</span>}
    </>
  )
}
