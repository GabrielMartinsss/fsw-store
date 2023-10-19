import { MenuIcon, ShoppingCartIcon } from 'lucide-react'
import { Button } from './button'
import { Card } from './card'

export default function Header() {
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Button variant="outline" size="icon">
        <MenuIcon />
      </Button>

      <h1 className="font-bold text-lg">
        <span className="from-[#5033c3] to-[#8162ff] bg-gradient-to-r bg-clip-text text-transparent">
          FSW
        </span>
        Store
      </h1>

      <Button variant="outline" size="icon">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}
