import { ChevronLeft, ChevronRight } from 'lucide-react'

import { PER_PAGE } from '@/hooks/use-pagination'

import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

interface PaginationProps {
  page: number
  total: number
  nextPage: () => Promise<void> | void
  previousPage: () => Promise<void> | void
  itemsPerPage?: number | string
  onItemsPerPageChange?: (value: string) => void
  showTotal?: boolean
}

export function Pagination({
  page,
  total,
  nextPage,
  previousPage,
  itemsPerPage = PER_PAGE,
  onItemsPerPageChange,
  showTotal = true
}: PaginationProps) {
  const numItemsPerPage = itemsPerPage === 'all' ? total : Number(itemsPerPage)
  const pages = Math.ceil(total / numItemsPerPage) || 1

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {onItemsPerPageChange && (
          <>
            <span className="text-sm text-muted-foreground">Mostrar</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={onItemsPerPageChange}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="all">Todos</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">por página</span>
          </>
        )}
        {showTotal && (
          <span className="ml-2 text-sm text-muted-foreground">
            {numItemsPerPage} de um total de {total} item(s)
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="whitespace-nowrap text-sm font-medium">
          Página {page} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => previousPage()}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => nextPage()}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pages <= page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
