import { Categories } from './components/categories'
import { prismaClient } from '@/lib/prisma'
import ProductList from '@/components/ui/product-list'
import SectionTitle from '@/components/ui/section-title'
import PromoBanner from './components/promo-banner'
import Search from './components/search'

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

  const products = await prismaClient.product.findMany({})

  return (
    <div className="flex flex-col gap-8 text-accent dark:text-white">
      <Search products={products} />

      <PromoBanner
        src="/banner_01.png"
        alt="Até 55% de desconto esse mês!"
        className="md:hidden"
      />

      <PromoBanner
        src="/banner_01_desk.png"
        alt="Ofertas imperdíveis! Até 55% de desconto esse mês!"
        quality={100}
        className="hidden px-0 md:block"
      />

      <div className="px-5 md:px-24">
        <Categories />
      </div>

      <div className="px-1 md:px-24">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner_mouses.png"
        alt="Até 55% de desconto em mouses!"
        className="md:hidden"
      />

      <div className=" hidden gap-8 px-24 md:grid md:grid-cols-2">
        <PromoBanner
          src="/banner_mouses.png"
          alt="Até 55% de desconto em mouses!"
        />
        <PromoBanner
          src="/banner_fones.png"
          alt="Até 20% de desconto em fones!"
        />
      </div>

      <div className="px-1 md:px-24">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyborads} />
      </div>

      <PromoBanner
        src="/banner_fones.png"
        alt="Até 20% de desconto em fones!"
        className="md:hidden"
      />

      <PromoBanner
        src="/banner_frete_gratis.png"
        alt="Até 20% de desconto em fones!"
        className="hidden md:block md:px-24"
      />

      <div className="px-1 md:px-24">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
