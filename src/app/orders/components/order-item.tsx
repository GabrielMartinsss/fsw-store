import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Prisma } from '@prisma/client'
import OrderItemHeader from './order-item-header'
import OrderProductItem from './order-product-item'
import { Separator } from '@/components/ui/separator'
import OrderItemTotalPrice from './order-item-total-price'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  }>
  index: number
}

function createOrderNumber(number: number): string {
  const numberForated = number.toString().padStart(3, '0')
  const numberWithHashtag = `#${numberForated}`

  return numberWithHashtag
}

export default function OrderItem({ order, index }: OrderItemProps) {
  return (
    <Card>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id} className="px-5">
          <AccordionTrigger className="gap-10">
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm font-bold uppercase">Número do pedido</p>
              <span className="text-xs font-normal text-zinc-500">{`${createOrderNumber(
                index + 1,
              )}`}</span>
            </div>
            <OrderItemHeader
              order={order}
              className="hidden text-left md:flex md:flex-1"
            />
          </AccordionTrigger>

          <AccordionContent>
            <main className="space-y-5">
              <OrderItemHeader order={order} className="md:hidden" />

              <Separator />

              <div className="space-y-5">
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}
              </div>

              <OrderItemTotalPrice order={order} />
            </main>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
