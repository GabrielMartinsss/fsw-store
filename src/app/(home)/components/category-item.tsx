import { Badge } from '@/components/ui/badge'
import { CATEGORY_ICON } from '@/constants/category-icons'
import { Category } from '@prisma/client'

interface CartegoryProps {
  category: Category
}

export default function CategoryItem({ category }: CartegoryProps) {
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center gap-2 rounded-lg py-3"
    >
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  )
}
