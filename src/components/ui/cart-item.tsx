import { CartContext, CartProduct } from '@/providers/cart'
import Image from 'next/image'
import { Button } from './button'
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react'
import { useContext } from 'react'
import formatPrice from '@/helpers/format-price'

interface CartItemProps {
  product: CartProduct
}

export default function CartItem({ product }: CartItemProps) {
  const {
    decreaseProductToCart,
    increaseProductToCart,
    removeProductFromCart,
  } = useContext(CartContext)

  function handleDecreaseProductToCartClick() {
    decreaseProductToCart(product.id)
  }

  function handleIncreaseProductToCartClick() {
    increaseProductToCart(product.id)
  }

  function handleRemoveProductFromCartClick() {
    removeProductFromCart(product.id)
  }

  const formatedBasePrice = formatPrice(Number(product.basePrice))
  const formatedTotalPrice = formatPrice(Number(product.totalPrice))

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-bold text-sm">{formatedTotalPrice}</p>

            {product.discountPercentage > 0 && (
              <p className="text-xs text-zinc-500 line-through">
                {formatedBasePrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseProductToCartClick}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseProductToCartClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleRemoveProductFromCartClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  )
}
