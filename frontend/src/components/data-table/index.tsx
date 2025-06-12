import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { TableSkeleton as Skeleton } from './table-skeleton'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loadingData: boolean
  rowAttributes?: (row: TData) => React.HTMLAttributes<HTMLTableRowElement>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loadingData,
  rowAttributes
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data || [],
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting
    }
  })

  if (loadingData) return <Skeleton columns={columns} data={[]} />

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-md border border-muted shadow-md">
          <Table className="h-full w-full table-auto text-left text-sm">
            <TableHeader className="bg-black hover:bg-zinc-950/100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="text-center" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="px-4 py-2 text-center font-semibold text-white"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const rowProps = rowAttributes
                    ? rowAttributes(row.original)
                    : {}

                  return (
                    <TableRow
                      className={`border-b border-gray-200 text-center transition duration-200 ${rowProps.className || ''}`}
                      key={row.id}
                      {...rowProps}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="px-4 py-3 text-center text-sm text-gray-700"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 bg-gray-50 text-center text-black"
                  >
                    Nenhum registro foi encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <div
                key={row.id}
                className="overflow-hidden rounded-md border border-muted shadow-md"
              >
                <div className="bg-black px-4 py-2 text-center font-semibold text-white">
                  {/* Header do card */}
                </div>
                <div className="divide-y divide-gray-200">
                  {row.getVisibleCells().map((cell) => {
                    const header = table
                      .getHeaderGroups()[0]
                      .headers.find((h) => h.id === cell.column.id)

                    return (
                      <div
                        key={cell.id}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {header?.column.columnDef.header
                            ? flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            : ''}
                        </span>
                        <span className="text-sm text-gray-700">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        ) : (
          <div className="h-24 rounded-md border border-muted bg-gray-50 text-center text-black">
            Nenhum registro foi encontrado.
          </div>
        )}
      </div>
    </div>
  )
}
