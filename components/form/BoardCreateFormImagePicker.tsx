'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckIcon, Loader2Icon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { unsplash } from '@/lib/unsplash'
import { defaultBoardImages } from '@/constants/board-images'

import { FormErrors } from './FormErrors'

interface Props {
  id: string
  errors?: Record<string, string[] | undefined>
}

type Image = Record<string, any>

export const BoardCreateFormImagePicker = ({ id, errors }: Props) => {
  const { pending } = useFormStatus()

  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState<Image[]>(defaultBoardImages)
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    // fetch photos from Unsplash
    unsplash.photos
      .getRandom({
        collectionIds: ['317099'], // recommended collection of wallpapers
        count: 9,
      })
      .then((result) => {
        result?.response
          ? setImages(result.response as Image[])
          : console.error('Failed to get images from Unsplash')
      })
      .catch((err) => {
        console.error(err)
        setImages(defaultBoardImages)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2Icon className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    )
  }

  const handleImageClick = (id: any) => () => {
    if (pending) return
    setSelectedImageId(id)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => {
          const isSelected = selectedImageId === image.id

          // <ImageRadio>:
          return (
            <div
              key={image.id}
              className={cn(
                'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                pending && 'opacity-50 hover:opacity-50 cursor-auto'
              )}
              onClick={handleImageClick(image.id)}
            >
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                checked={isSelected}
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                src={image.urls.thumb}
                alt="Unsplash image"
                className="object-cover rounded-sm"
                fill
              />
              {isSelected && <ImageCheckOverlay />}
              <PhotographerLink image={image} />
            </div>
          )
        })}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  )
}

const ImageCheckOverlay = () => {
  return (
    <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
      <CheckIcon className="h-4 w-4 text-white" />
    </div>
  )
}

const PhotographerLink = ({ image }: { image: Image }) => {
  return (
    <Link
      href={image.links.html}
      target="_blank"
      className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
    >
      {image.user.name}
    </Link>
  )
}
