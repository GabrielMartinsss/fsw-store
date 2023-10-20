import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'

export default function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader className="text-left text-lg font-semibold">
          Menu
        </SheetHeader>

        <Separator className="mb-4 mt-4" />

        <div className="relative h-full">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <HomeIcon size={16} />
            Inicio
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <PercentIcon size={16} />
            Ofertas
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ListOrderedIcon size={16} />
            Catálogo
          </Button>
          <Button
            variant="ghost"
            className="absolute bottom-12 left-0 w-full justify-start gap-2"
          >
            <LogInIcon size={16} />
            Login
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
