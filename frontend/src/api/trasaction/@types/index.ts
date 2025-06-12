import { TransactionType } from '@/utils'

type Bill = {
  name: string
}

export type Transaction = {
  id: string
  description: string
  value: number
  destinationId: number
  type: TransactionType
  createdAt: Date
  bill: Bill
  reversed: boolean
}

export type FetchAllTransactionsResponseOutputApi = {
  data: Transaction[]
  total: number
}
