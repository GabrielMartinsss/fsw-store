import { Badge } from '@/components/ui/badge'
import { LayoutGridIcon } from 'lucide-react'
import CategoryItem from './components/category-item'
import { prismaClient } from '@/lib/prisma'

export default async function CatalogPage() {
  const categories = await prismaClient.category.findMany({})

  return (
    <div className="flex flex-col gap-8 p-5 dark:text-white md:px-24">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <LayoutGridIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
