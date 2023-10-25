'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/product'
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    'basePrice' | 'totalPrice' | 'discountPercentage' | 'description' | 'name'
  >
}
export default function ProductInfo({
  product: { basePrice, description, discountPercentage, totalPrice, name },
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  function handleDecreaseQuantityClick() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  function handleIncreaseQuantityClick() {
    setQuantity((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-1">
        <h1 className="text-2xl font-bold">R$ {totalPrice.toFixed(2)}</h1>

        {discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {discountPercentage}%
          </Badge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm text-zinc-500 ">
          De:{' '}
          <span className="line-through">
            {' '}
            R$ {Number(basePrice).toFixed(2)}{' '}
          </span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleDecreaseQuantityClick()}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={() => handleIncreaseQuantityClick()}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  )
}
