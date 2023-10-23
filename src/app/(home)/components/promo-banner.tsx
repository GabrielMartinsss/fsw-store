import Image, { ImageProps } from 'next/image'

export default function PromoBanner({ src, alt }: ImageProps) {
  return (
    <Image
      src={src}
      height={0}
      width={0}
      className="h-auto w-full px-5"
      sizes="100vw"
      alt={alt}
      quality={100}
    />
  )
}
