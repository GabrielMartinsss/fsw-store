import { Prisma } from '@prisma/client'
import { format } from 'date-fns'

interface OrderItemHeaderProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: true
    }
  }>
}

export default function OrderItemHeader({ order }: OrderItemHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="text-xs font-bold">
          <p className="uppercase">Status</p>
          <span className="text-[#8162ff]">
            {order.status === 'PAYMENT_CONFIRMED' ? 'Pago' : 'Aguardando pgto.'}
          </span>
        </div>

        <div className="text-xs">
          <p className="font-bold uppercase">Data</p>
          <span className="text-zinc-500">
            {format(order.createdAt, 'dd/mm/yyyy')}
          </span>
        </div>

        <div className="text-xs">
          <p className="font-bold uppercase">Pagamento</p>
          <span className="text-zinc-500">Cartão</span>
        </div>
      </div>
    </div>
  )
}
