'use client'

import { ProductWithTotalPrice } from '@/helpers/product'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartSubTotalPrice: number
  cartTotalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductToCart: (productId: string) => void
  increaseProductToCart: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartSubTotalPrice: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductToCart: () => {},
  increaseProductToCart: () => {},
  removeProductFromCart: () => {}
})

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('@fsw-store/cart-products') || '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem('@fsw-store/cart-products', JSON.stringify(products))
  }, [products])

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) =>  {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice) * product.quantity
    }, 0)
  }, [products])

  const totalDiscount = subTotal - total

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

  function removeProductFromCart(productId: string) {
    setProducts(prev => prev.filter((cartProduc) => cartProduc.id !== productId))
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductToCart,
        increaseProductToCart,
        removeProductFromCart,
        cartSubTotalPrice: subTotal,
        cartTotalPrice: total,
        cartTotalDiscount: totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
