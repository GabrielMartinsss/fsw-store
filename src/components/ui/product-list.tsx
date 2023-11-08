import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Product } from '@prisma/client'

interface ProductListProps {
  products: Product[]
}
export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 pb-3 md:px-0 md:[&::-webkit-scrollbar-thumb]:rounded-md md:[&::-webkit-scrollbar-thumb]:bg-zinc-500 md:[&::-webkit-scrollbar-track]:bg-light-accent dark:md:[&::-webkit-scrollbar-track]:bg-accent [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block md:[&::-webkit-scrollbar]:h-3">
      {products.map((product) => (
        <div key={product.id} className="w-[170px] min-w-[170px] max-w-[170px]">
          <ProductItem product={computeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  )
}
