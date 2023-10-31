export default function formatPrice(numberToFormat: number) {
  const formatedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberToFormat)

  return formatedPrice
}
