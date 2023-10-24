'use client'

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'
import { Separator } from './ui/separator'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'

export default function SideMenu() {
  async function handleLoginClick() {
    await signIn()
  }
  async function handleLogoutClick() {
    await signOut()
  }

  const { data, status } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="text-left text-lg font-semibold">
          {status === 'authenticated' && data?.user && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {data.user.name?.[0].toUpperCase()}
                </AvatarFallback>

                {data.user.image && <AvatarImage src={data.user.image} />}
              </Avatar>
              <p>{data?.user?.name}</p>
            </div>
          )}
          {status === 'unauthenticated' && <span>Menu</span>}
        </SheetHeader>

        <Separator />

        <div className="flex-1">
          <SheetClose asChild>
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <HomeIcon size={16} />
                Início
              </Button>
            </Link>
          </SheetClose>

          <Button variant="ghost" className="w-full justify-start gap-2">
            <PercentIcon size={16} />
            Ofertas
          </Button>

          <SheetClose asChild>
            <Link href="/catalog">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <ListOrderedIcon size={16} />
                Catálogo
              </Button>
            </Link>
          </SheetClose>
        </div>
        {status === 'unauthenticated' && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleLoginClick}
          >
            <LogInIcon size={16} />
            Login
          </Button>
        )}

        {status === 'authenticated' && (
          <Button
            variant="ghost"
            className="bottom-0 w-full justify-start gap-2 text-red-500 hover:text-red-500"
            onClick={handleLogoutClick}
          >
            <LogInIcon size={16} className="text-red-500" />
            Logout
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
