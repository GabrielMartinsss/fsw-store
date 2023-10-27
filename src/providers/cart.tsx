'use client'

import { ProductWithTotalPrice } from '@/helpers/product'
import { ReactNode, createContext, useState } from 'react'

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductToCart: (productId: string) => void
  increaseProductToCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductToCart: () => {},
  increaseProductToCart: () => {},
})

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  function addProductToCart(product: CartProduct) {
    const productIsAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id)

    if (productIsAlreadyOnCart) {
      setProducts((prev) => 
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity
            }
          }
          return cartProduct
        })
      )

      return
    }

    setProducts((prev) => [...prev, product])
  }

  function decreaseProductToCart(productId: string) {
    setProducts(prev => prev.map((cartProduct) => {
      if (cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity - 1
        }
      }

      return cartProduct
    }).filter((cartProduct) => cartProduct.quantity > 0))
  }

  function increaseProductToCart(productId: string) {
    setProducts(prev => prev.map((cartProduct) => {
      if (cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + 1
        }
      }

      return cartProduct
    }))
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductToCart,
        increaseProductToCart,
        cartBasePrice: 0,
        cartTotalPrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
