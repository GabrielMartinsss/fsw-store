import { Separator } from '@/components/ui/separator'
import formatPrice from '@/helpers/format-price'
import { computeProductTotalPrice } from '@/helpers/product'
import { Prisma } from '@prisma/client'

interface OrderItemTotalPrice {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  }>
}

export default function OrderItemTotalPrice({ order }: OrderItemTotalPrice) {
  const subTotalPrice = order.orderProducts.reduce((acc, orderProduct) => {
    return acc + Number(orderProduct.basePrice) * orderProduct.quantity
  }, 0)

  const totalPrice = order.orderProducts.reduce((acc, orderProduct) => {
    return (
      acc +
      computeProductTotalPrice(orderProduct.product).totalPrice *
        orderProduct.quantity
    )
  }, 0)

  const totalDiscount = subTotalPrice - totalPrice

  return (
    <div className="flex flex-col gap-3">
      <Separator />
      <div className="flex items-center justify-between text-xs">
        <p>Subtotal</p>
        <p>{formatPrice(subTotalPrice)}</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between text-xs">
        <p>Entrega</p>
        <p className="uppercase">gratís</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between text-xs">
        <p>Descontos</p>
        <p>- {formatPrice(totalDiscount)}</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between text-sm font-bold">
        <p>Total</p>
        <p>{formatPrice(totalPrice)}</p>
      </div>
    </div>
  )
}
