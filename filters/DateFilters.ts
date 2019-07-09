import format from 'date-fns/format'

export function previewDate(date: Date): string {
  return format(date, 'MMMM do')
}
