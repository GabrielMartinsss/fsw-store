import { Badge } from '@/components/ui/badge'
import ProductItem from '@/components/ui/product-item'
import { CATEGORY_ICON } from '@/constants/category-icons'
import { computeProductTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'

interface CategoryProductsProps {
  params: {
    slug: string
  }
}

export default async function CategoryProducts({
  params,
}: CategoryProductsProps) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  })

  if (!category) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 p-5 md:px-24">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category?.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 md:flex md:flex-wrap">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
            className="md:min-w-[12rem] md:max-w-[12rem]"
          />
        ))}
      </div>
    </div>
  )
}
