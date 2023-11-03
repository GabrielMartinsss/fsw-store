'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImagesProps {
  name: string
  imageUrls: string[]
}

export default function ProductImages({ name, imageUrls }: ProductImagesProps) {
  const [curentImage, setCurrentImage] = useState(imageUrls[0])

  function handleImageClick(imageUrl: string) {
    setCurrentImage(imageUrl)
  }

  return (
    <div className="flex flex-col md:relative md:flex-1 ">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent md:h-full md:rounded-xl">
        <Image
          src={curentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[75%]"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3 px-5 md:absolute md:grid-cols-2 lg:absolute lg:grid-cols-1">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent md:h-[4.8125rem] md:w-[4.8125rem] md:rounded-2xl md:bg-zinc-950 ${
              imageUrl === curentImage && 'border-2 border-solid border-primary'
            }`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
