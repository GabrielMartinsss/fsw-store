import { ProductWithTotalPrice } from '@/helpers/product'
import Image from 'next/image'
import { Badge } from './badge'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
import formatPrice from '@/helpers/format-price'
import { twMerge } from 'tailwind-merge'

interface ProductItemProps {
  product: ProductWithTotalPrice
  className?: string
}
export default function ProductItem({ product, className }: ProductItemProps) {
  const formatedTotalPrice = formatPrice(product.totalPrice)
  const formatedBasePrice = formatPrice(Number(product.basePrice))

  return (
    <Link href={`/product/${product.slug}`}>
      <div className=" relative flex flex-col gap-4">
        <div
          className={twMerge(
            'flex h-[10.625rem] min-h-[10.625rem] w-full items-center justify-center rounded-lg bg-light-accent dark:bg-accent',
            className,
          )}
        >
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
          <Badge className="absolute left-2 top-2 px-2 py-[2px] text-white">
            <ArrowDown size={14} />
            {product.discountPercentage} %
          </Badge>
        )}

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {product.name}
          </p>

          <div className="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold">{formatedTotalPrice}</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  {formatedBasePrice}
                </p>
              </>
            ) : (
              <p className="font-semibold">{formatedTotalPrice}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
