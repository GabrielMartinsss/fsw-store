import { Badge } from '@/components/ui/badge'
import { CATEGORY_ICON } from '@/constants/category-icons'
import { Category } from '@prisma/client'
import Link from 'next/link'

interface CartegoryProps {
  category: Category
}

export default function CategoryItem({ category }: CartegoryProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant="outline"
        className="flex items-center justify-center gap-2 rounded-lg py-3 dark:text-white md:w-full"
      >
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span className="text-xs font-bold">{category.name}</span>
      </Badge>
    </Link>
  )
}
