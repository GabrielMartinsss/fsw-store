import { ComponentProps } from 'react'

export default function SectionTitle({
  children,
  ...props
}: ComponentProps<'p'>) {
  return (
    <p className="mb-3 pl-5 font-bold uppercase md:pl-0" {...props}>
      {children}
    </p>
  )
}
