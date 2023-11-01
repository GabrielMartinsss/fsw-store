import { Badge } from '@/components/ui/badge'
import { authOptions } from '@/lib/auth'
import { prismaClient } from '@/lib/prisma'
import { ShoppingBag } from 'lucide-react'
import { getServerSession } from 'next-auth'
import OrderItem from './components/order-item'

export default async function OrderPage() {
  const user = getServerSession(authOptions)

  if (!user) {
    return <p>Access Denied</p>
  }

  console.log()

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: true,
    },
  })

  return (
    <div className="space-y-5 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingBag size={16} />
        Meus pedidos
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <OrderItem key={order.id} order={order} index={index} />
        ))}
      </div>
    </div>
  )
}
