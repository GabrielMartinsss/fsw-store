'use client'

import { LogInIcon, User2 } from 'lucide-react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

export default function LoginMenu() {
  const { data, status } = useSession()

  async function handleLoginClick() {
    await signIn()
  }

  async function handleLogoutClick() {
    await signOut()
  }

  return (
    <div className="hidden md:block">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9 w-9 p-2">
            {status === 'authenticated' && data.user && (
              <Avatar className="h-9 w-9 rounded-md object-contain">
                <AvatarFallback>
                  {data.user.name[0].toUpperCase()}
                </AvatarFallback>
                {data.user.image && <AvatarImage src={data.user.image} />}
              </Avatar>
            )}

            {status === 'unauthenticated' && (
              <User2 size={20} onClick={handleLoginClick} />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="mr-5 w-fit border-light-accent bg-background dark:border-zinc-800 dark:bg-accent dark:text-white">
          {status === 'authenticated' && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm ">{data.user.name}</p>
              <p className="text-xs text-zinc-500 ">{data.user.email}</p>
              <Button
                variant="ghost"
                className="gap-2 text-red-500 dark:hover:bg-zinc-800"
                onClick={handleLogoutClick}
              >
                <LogInIcon size={16} />
                Logout
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
