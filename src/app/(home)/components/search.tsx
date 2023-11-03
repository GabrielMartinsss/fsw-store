'use client'

import { Input } from '@/components/ui/input'
import { Table, TableBody, TableRow } from '@/components/ui/table'
import { Product } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface SearchProps {
  products: Product[]
}

export default function Search({ products }: SearchProps) {
  const [search, setSearch] = useState<string | null>(null)

  return (
    <div className="fixed left-[50%] top-28 z-40 flex translate-x-[-50%] flex-col gap-1 ">
      <div className=" flex w-[22rem] items-center gap-5 rounded-md bg-accent px-3 outline-2 focus-within:outline md:w-[30rem]">
        <Input
          placeholder="Pesquisar produto"
          value={search === null ? '' : search}
          onChange={(ev) => setSearch(ev.target.value)}
          className="outline-none"
        />

        <SearchIcon size={16} />
      </div>

      {search && (
        <Table>
          <TableBody>
            {products
              .filter((product) =>
                search?.toLowerCase() === ''
                  ? null
                  : product.slug.toLocaleLowerCase().includes(search),
              )
              .map((product) => (
                <TableRow
                  className="border-zinc-700 bg-accent"
                  key={product.slug}
                >
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
