import { ProductWithTotalPrice } from '@/helpers/product'
import Image from 'next/image'
import { Badge } from './badge'
import { ArrowDown } from 'lucide-react'

interface ProductItemProps {
  product: ProductWithTotalPrice
}
export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className=" relative flex max-w-[156px] flex-col gap-4">
      <div className="flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[75%]"
          style={{
            objectFit: 'contain',
          }}
          alt={product.name}
        />
      </div>

      {product.discountPercentage > 0 && (
        <Badge className="absolute left-2 top-2 px-2 py-[2px]">
          <ArrowDown size={14} />
          {product.discountPercentage} %
        </Badge>
      )}

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
          {product.name}
        </p>

        <div className="flex items-baseline gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold">
                R$ {product.totalPrice.toFixed(2)}
              </p>
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-semibold">R$ {product.totalPrice.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  )
}
