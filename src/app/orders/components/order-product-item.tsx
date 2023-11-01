import { computeProductTotalPrice } from '@/helpers/product'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import formatPrice from '@/helpers/format-price'

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

export default function OrderProductItem({
  orderProduct,
}: OrderProductItemProps) {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[4.8125rem] min-h-[4.8125rem] w-[4.8125rem] min-w-[4.8125rem] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex h-[4.8125rem] flex-1 flex-col justify-between">
        <p className="rounded-sm bg-accent px-4 text-center text-[0.625rem]">
          Vendido e entregue por: <span className="font-bold">FWS Store</span>
        </p>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-baseline justify-between">
          {orderProduct.discountPercentage > 0 ? (
            <div className="flex items-baseline gap-2">
              <p className="font-bold">
                {formatPrice(Number(productWithTotalPrice.totalPrice))}{' '}
              </p>
              <span className="text-xs font-normal text-zinc-500 line-through">
                {formatPrice(Number(orderProduct.basePrice))}
              </span>
            </div>
          ) : (
            <p className="font-bold">
              {formatPrice(Number(productWithTotalPrice.totalPrice))}
            </p>
          )}

          <p className="text-xs text-zinc-400">Qtd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  )
}
