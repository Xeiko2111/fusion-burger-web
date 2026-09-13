import { IMAGES, type ImageAsset, type ImageId } from '@/data/images'

interface ProductProps {
  id: ImageId
  alt: string
  className?: string
  /** Ancho que va a ocupar la imagen, para que el navegador elija bien el srcset */
  sizes?: string
  /** Solo para el hero y el logo: sin lazy. La prioridad real la marca
   *  el <link rel="preload"> de index.html. */
  priority?: boolean
}

/**
 * Fotografía de producto. Los assets originales vienen recortados con canal
 * alfa, así que nunca hay recuadro ni máscara: la silueta del producto es la
 * forma. Se declaran width y height para que no haya layout shift.
 */
export function Product({ id, alt, className = '', sizes = '(max-width: 768px) 88vw, 45vw', priority = false }: ProductProps) {
  const asset: ImageAsset = IMAGES[id]
  const base = `/assets/${asset.path}.webp`

  // Los WebP animados no llevan srcset: las variantes pequeñas son pósters fijos.
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
