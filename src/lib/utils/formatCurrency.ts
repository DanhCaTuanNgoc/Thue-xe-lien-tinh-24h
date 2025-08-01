export function formatNumberVND(value: number | string): string {
   const number =
      typeof value === 'number' ? value : Number(value.toString().replace(/[^\d]/g, ''))
   if (!number) return ''
   return number.toLocaleString('en-US')
}
