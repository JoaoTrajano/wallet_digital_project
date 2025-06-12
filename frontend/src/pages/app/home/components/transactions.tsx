import { ColumnDef } from '@tanstack/react-table'
import { StepBackIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Transaction } from '@/api/trasaction/@types'
import { useFetchAllTransactions } from '@/api/trasaction/fetch-all-transactions'
import { DataTable } from '@/components/data-table'
import { TableCell } from '@/components/data-table/table-cell'
import { Modal } from '@/components/modal'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import usePagination, { PER_PAGE } from '@/hooks/use-pagination'
import { formatDateBR, formatMoneyBR } from '@/utils'

import { RevertTransaction } from './revert-transaction'
import { TransactionTypeLabel } from './transaction-type'

export function Transactions() {
  const [total, setTotal] = useState<number>(0)
  const [transactionId, setTransactionId] = useState<string>('')

  const { currentPage, goToNextPage, goToPreviousPage } = usePagination({
    total
  })
  const { openModal } = useModal()

  const { data: responseFetchAllTransactions, isLoading } =
    useFetchAllTransactions({
      page: currentPage,
      perPage: PER_PAGE
    })

  useEffect(() => {
    if (responseFetchAllTransactions?.total) {
      setTotal(responseFetchAllTransactions.total)
    }
  }, [responseFetchAllTransactions?.total])

  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      {
        accessorKey: 'description',
        header: () => <p>Descrição</p>,
        cell: ({ row }) => (
          <TableCell className="min-w-[150px] text-muted-foreground">
            {row.original.description}
          </TableCell>
        )
      },
      {
        accessorKey: 'bill.name',
        header: () => <p>Carteira usada</p>,
        cell: ({ row }) => (
          <div className="min-w-[150px] text-muted-foreground">
            <p>{row.original.bill.name}</p>
          </div>
        )
      },
      {
        accessorKey: 'value',
        header: () => <p>Valor da transação</p>,
        cell: ({ row }) => (
          <div className="min-w-[120px] text-muted-foreground">
            <p
              className={
                row.original.reversed ? 'text-red-500 line-through' : ''
              }
            >
              {formatMoneyBR(row.original.value)}
            </p>
          </div>
        )
      },
      {
        accessorKey: 'type',
        header: () => <p>Tipo da transação</p>,
        cell: ({ row }) => (
          <div className="min-w-[100px] text-muted-foreground">
            <TransactionTypeLabel type={row.original.type} />
          </div>
        )
      },
      {
        accessorKey: 'createdAt',
        header: () => <p>Data da Transferência</p>,
        cell: ({ row }) => (
          <TableCell className="min-w-[140px] text-muted-foreground">
            {formatDateBR(row.original.createdAt)}
          </TableCell>
        )
      },
      {
        accessorKey: 'reversed',
        header: () => <p>Transação Revertida</p>,
        cell: ({ row }) =>
          row.original.reversed ? (
            <TableCell className="min-w-[140px] text-muted-foreground">
              Sim
            </TableCell>
          ) : (
            <TableCell className="min-w-[140px] text-muted-foreground">
              Não
            </TableCell>
          )
      },
      {
        accessorKey: 'actions',
        header: 'Reverter transação',
        cell: ({ row }) => {
          return (
            <div className="min-w-[120px]">
              <Button
                onClick={() => {
                  setTransactionId(row.original.id)
                  openModal('ReverseTransaction')
                }}
                variant="ghost"
                size="xs"
                disabled={row.original.reversed}
              >
                <StepBackIcon className="mr-2 text-green-500" />
              </Button>
            </div>
          )
        }
      }
    ],
    []
  )

  return (
    <section className="mt-10 flex w-full flex-col items-center">
      <div className="w-full rounded-lg p-6 shadow">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="mb-2 text-xl font-semibold">Transações</h2>
        </header>
        <div className="overflow-x-auto rounded-md border border-muted-foreground">
          <DataTable
            columns={columns}
            data={responseFetchAllTransactions?.data || []}
            loadingData={isLoading}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Pagination
            nextPage={goToNextPage}
            previousPage={goToPreviousPage}
            page={currentPage}
            total={total}
          />
        </div>
      </div>
      <Modal modal="ReverseTransaction">
        <RevertTransaction transactionId={transactionId} />
      </Modal>
    </section>
  )
}
