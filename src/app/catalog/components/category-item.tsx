import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryItemProps {
  category: Category
}

export default function CategoyItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex h-[9.375rem] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient lg:h-[12.5rem]">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="rounded-bl-lg rounded-br-lg bg-accent py-2">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </div>
    </Link>
  )
}
