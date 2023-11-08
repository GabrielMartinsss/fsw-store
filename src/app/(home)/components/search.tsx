'use client'

import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
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
      <div className=" flex w-[22rem] items-center gap-5 rounded-md bg-light-accent px-3 shadow-md outline-2 dark:bg-accent md:w-[30rem]">
        <Input
          placeholder="Pesquisar produto"
          value={search === null ? '' : search}
          onChange={(ev) => setSearch(ev.target.value)}
          className="border-none bg-transparent outline-none dark:text-white"
        />

        <SearchIcon size={16} className="dark:text-white" />
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
                  className=" border-light-active-accent bg-light-accent dark:border-zinc-700 dark:bg-accent dark:text-white"
                  key={product.slug}
                >
                  <TableCell className="mt-4 rounded-lg px-3 py-1">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
