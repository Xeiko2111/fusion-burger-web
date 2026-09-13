import { IMAGES, type ImageAsset, type ImageId } from '@/data/images'

interface ProductProps {
  id: ImageId
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function Product({ id, alt, className = '', sizes = '(max-width: 768px) 88vw, 45vw', priority = false }: ProductProps) {
  const asset: ImageAsset = IMAGES[id]
  const base = `/assets/${asset.path}.webp`

  const srcSet = asset.animated
    ? undefined
    : asset.widths
        .map((w) => (w === asset.w ? `${base} ${w}w` : `/assets/${asset.path}-${w}.webp ${w}w`))
        .join(', ')

  return (
    <img
      src={base}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={asset.w}
      height={asset.h}
      alt={alt}
      draggable={false}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      className={className}
    />
  )
}

export function aspectOf(id: ImageId): number {
  const a = IMAGES[id]
  return a.w / a.h
}
