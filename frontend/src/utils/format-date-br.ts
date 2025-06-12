import { format } from 'date-fns'

export function formatDateBR(date: string | Date | null | undefined): string {
  if (!date) {
    return '-'
  }

  try {
    if (date instanceof Date) {
      return format(date, 'dd/MM/yyyy')
    }
    return format(new Date(date), 'dd/MM/yyyy')
  } catch (error) {
    return '-'
  }
}
