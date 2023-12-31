'use client'

import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from './badge'
import { useContext } from 'react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { Separator } from './separator'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { createCheckout } from '@/actions/checkout'
import { loadStripe } from '@stripe/stripe-js'
import formatPrice from '@/helpers/format-price'
import createOrder from '@/actions/order'
import { signIn, useSession } from 'next-auth/react'

export default function Cart() {
  const { data } = useSession()
  const { products, cartSubTotalPrice, cartTotalDiscount, cartTotalPrice } =
    useContext(CartContext)

  async function handleFinishPurchaseClick() {
    if (!data) {
      signIn()

      return
    }
    const order = await createOrder(products, data.user.id)

    const checkout = await createCheckout(products, order.id)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  }

  const formatedCartSubTotalPrice = formatPrice(cartSubTotalPrice)
  const formatedCartTotalPrice = formatPrice(cartTotalPrice)
  const formatedTotalDiscount = formatPrice(cartTotalDiscount)

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3">
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem key={product.name} product={product} />
            ))
          ) : (
            <p className="font-semibold">Seu carrinho está vazio!</p>
          )}
        </div>
      </ScrollArea>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>{formatedCartSubTotalPrice}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p className="uppercase">gratís</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- {formatedTotalDiscount}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>{formatedCartTotalPrice}</p>
          </div>
          <Button
            className="mt-8 font-bold uppercase text-white"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  )
}
