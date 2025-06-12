export function clearFormatMoneyBR(value: string): number {
  const cleaned = value.replace(/[^\d,]/g, '').replace(',', '.')
  const number = parseFloat(cleaned)
  return isNaN(number) ? 0 : number
}
