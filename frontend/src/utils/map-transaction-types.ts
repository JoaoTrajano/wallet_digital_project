export enum TransactionType {
  TRANSFER = 'TRANSFER',
  DEPOSIT = 'DEPOSIT'
}

export function mapTransactionTypes(type: string): string {
  switch (type) {
    case TransactionType.TRANSFER:
      return 'Transferência'
    case TransactionType.DEPOSIT:
      return 'Depósito'
    default:
      return 'Desconhecido'
  }
}
