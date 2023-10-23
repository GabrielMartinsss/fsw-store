import { Categories } from './components/categories'
import { prismaClient } from '@/lib/prisma'
import ProductList from './components/product-list'
import SectionTitle from './components/section-title'
import PromoBanner from './components/promo-banner'

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  })
  const keyborads = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses',
      },
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <PromoBanner src="/banner_01.png" alt="Até 55% de desconto esse mês!" />

      <div className="px-5">
        <Categories />
      </div>

      <div className="px-1">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner_mouses.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div className="px-1">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyborads} />
      </div>

      <PromoBanner
        src="/banner_fones.png"
        alt="Até 20% de desconto em fones!"
      />

      <div className="px-1">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
