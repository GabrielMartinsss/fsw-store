import { Card } from './card'
import SideMenu from '../side-menu'
import Link from 'next/link'
import CartMenu from '../cart-menu'
import { Button } from './button'
import { Separator } from './separator'
import LoginMenu from './login-menu'

export default function Header() {
  return (
    <header className="relative z-10 my-16 bg-background text-accent dark:bg-dark-background dark:text-white">
      <Card className="dark:border-b-1 fixed left-0 right-0 top-0 flex w-full items-center justify-between rounded-none border-background bg-background p-[1.875rem] shadow-md dark:border-dark-background dark:border-b-accent dark:bg-dark-background md:px-24">
        <SideMenu />

        <Link href="/">
          <h1 className="text-lg font-bold  md:text-2xl">
            <span className="bg-gradient-to-r from-[#5033c3] to-[#8162ff] bg-clip-text text-transparent">
              FSW
            </span>
            Store
          </h1>
        </Link>

        <div className="hidden md:flex md:items-center md:text-base">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-bold"
            >
              Início
            </Button>
          </Link>

          <Separator orientation="vertical" className="h-4 bg-zinc-800" />

          <Link href="/catalog">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-bold"
            >
              Catálogo
            </Button>
          </Link>

          <Separator orientation="vertical" className="h-4 bg-zinc-800" />

          <Link href="/deals">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-bold"
            >
              Ofertas
            </Button>
          </Link>

          <Separator orientation="vertical" className="h-4 bg-zinc-800" />

          <Link href="/orders">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-bold"
            >
              Meus pedidos
            </Button>
          </Link>
        </div>

        <div className="flex md:gap-7">
          <LoginMenu />
          <CartMenu />
        </div>
      </Card>
    </header>
  )
}
