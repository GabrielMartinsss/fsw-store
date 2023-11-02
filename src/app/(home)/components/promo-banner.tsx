import Image, { ImageProps } from 'next/image'
import { twMerge } from 'tailwind-merge'

export default function PromoBanner({ src, alt, className }: ImageProps) {
  return (
    <Image
      src={src}
      height={0}
      width={0}
      className={twMerge('h-auto w-full px-5 md:px-0', className)}
      sizes="100vw"
      alt={alt}
      quality={100}
    />
  )
}
