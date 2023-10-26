import { ShoppingCartIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Cart from './ui/cart'

export default function CartMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <Cart />
      </SheetContent>
    </Sheet>
  )
}
