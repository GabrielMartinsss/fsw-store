'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/product'
import { CartContext } from '@/providers/cart'
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useContext, useState } from 'react'

interface ProductInfoProps {
  product: ProductWithTotalPrice
}
export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const { addProductToCart } = useContext(CartContext)

  function handleDecreaseQuantityClick() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  function handleIncreaseQuantityClick() {
    setQuantity((prev) => prev + 1)
  }

  function handleAddProductToCartClick() {
    addProductToCart({ ...product, quantity })
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-1">
        <h1 className="text-2xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>

        {product.discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm text-zinc-500 ">
          De:{' '}
          <span className="line-through">
            {' '}
            R$ {Number(product.basePrice).toFixed(2)}{' '}
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
        <p className="text-sm text-zinc-400">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddProductToCartClick}
      >
        Adicionar ao carrinho
      </Button>
    </div>
  )
}
