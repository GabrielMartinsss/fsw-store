import { prismaClient } from '@/lib/prisma'
import ProductImages from './components/product-images'
import ProductInfo from './components/product-info'
import { computeProductTotalPrice } from '@/helpers/product'
import { Button } from '@/components/ui/button'
import { TruckIcon } from 'lucide-react'
import ProductList from '@/components/ui/product-list'
import { Badge } from '@/components/ui/badge'

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({
  params: { slug },
}: ProductDetailPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  })

  const relatedProducts = await prismaClient.category.findFirst({
    where: {
      id: product?.categoryId,
    },
    include: {
      products: {
        where: {
          slug: {
            not: product?.slug,
          },
        },
      },
    },
  })

  if (!product) return null

  return (
    <div className="flex flex-col gap-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />

      <ProductInfo product={computeProductTotalPrice(product)} />

      <Button className="mx-5 mt-2 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <Badge className="mx-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />

          <div className="flex flex-col">
            <p className="text-xs font-normal">
              Entrega via <span className="font-bold"> FSPacket® </span>
            </p>

            <p className="text-xs font-normal text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete Grátis</p>
      </Badge>

      {relatedProducts && <ProductList products={relatedProducts?.products} />}
    </div>
  )
}
