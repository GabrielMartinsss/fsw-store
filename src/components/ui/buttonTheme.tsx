'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './button'
import { useState } from 'react'

export default function ButtonTheme() {
  const [theme, setTheme] = useState<string | null>(null)
  const currentTheme = document.documentElement.classList

  function toogleTheme() {
    if (currentTheme.contains('dark')) {
      currentTheme.toggle('dark')
      setTheme('dark')
    } else {
      currentTheme.toggle('dark')
      setTheme('light')
    }
  }
  return (
    <Button variant="outline" className="h-9 w-9 p-2" onClick={toogleTheme}>
      {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  )
}
