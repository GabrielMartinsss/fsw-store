import { Card } from './card'
import SideMenu from '../side-menu'
import Link from 'next/link'
import CartMenu from '../cart-menu'

export default function Header() {
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <SideMenu />

      <Link href="/">
        <h1 className="text-lg font-bold">
          <span className="bg-gradient-to-r from-[#5033c3] to-[#8162ff] bg-clip-text text-transparent">
            FSW
          </span>
          Store
        </h1>
      </Link>

      <CartMenu />
    </Card>
  )
}
