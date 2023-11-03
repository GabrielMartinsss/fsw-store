import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

interface OrderItemHeaderProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: true
    }
  }>
  className: string
}

export default function OrderItemHeader({
  order,
  className,
}: OrderItemHeaderProps) {
  return (
    <div className={twMerge('flex max-w-[684px] flex-col', className)}>
      <div className="flex justify-between">
        <div className="w-[100px] text-xs font-bold">
          <p className="uppercase">Status</p>
          <span className="text-[#8162ff]">
            {order.status === 'PAYMENT_CONFIRMED' ? 'Pago' : 'Pgto. pendente'}
          </span>
        </div>

        <div className="text-xs">
          <p className="font-bold uppercase">Data</p>
          <span className="text-zinc-500">
            {format(order.createdAt, 'dd/MM/yyyy')}
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
