import { ShoppingCartIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Cart from './ui/cart'

export default function CartMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-9 w-9 p-2">
          <ShoppingCartIcon size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[95%]">
        <Cart />
      </SheetContent>
    </Sheet>
  )
}
