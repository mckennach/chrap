'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  as?: string
  size?: 'sm' | 'md' | 'lg'
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'ghost'
    | 'link'
  radius?: 'sm' | 'md' | 'lg' | 'full' | 'none'
  square?: boolean
  outlined?: boolean
  scroll?: boolean
  className?: string
  elementType?: 'button' | 'link'
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  [x: string]: any
}

export default function Button({
  children,
  href,
  as,
  size,
  variant,
  className,
  radius,
  square = false,
  outlined = false,
  scroll = false,
  elementType = 'link',
  ...props
}: ButtonProps) {
  const [border, setBorder] = useState<string | null>(null)
  const [bgColor, setBgColor] = useState<string | null>(null)
  const [textColor, setTextColor] = useState<string | null>(null)
  const [padding, setPadding] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState<string | null>('')

  useEffect(() => {
    if (variant == 'primary') {
      if (!outlined) {
        setBgColor(
          'bg-supernova-400 hover:bg-supernova-300 active:bg-supernova-500 disabled:bg-supernova-800'
        )
        setTextColor(
          'text-black hover:text-black/75 disabled:text-supernova-700'
        )
        setBorder(
          'border border-supernova-400 hover:border-supernova-300 active:border-supernova-500 disabled:border-supernova-800'
        )
      } else {
        setBgColor(
          'bg-transparent hover:bg-supernova-300 active:bg-supernova-400 disabled:bg-transparent'
        )
        setTextColor('text-supernova-300 hover:text-black disabled:text-black')
        setBorder('border border-supernova-300')
      }
    } else if (variant == 'secondary') {
      if (!outlined) {
        setBgColor('bg-white hover:bg-gray-100')
        setTextColor('text-black hover:text-black/75')
        setBorder('border border-white hover:border-gray-100')
      } else {
        setBgColor('bg-transparent hover:bg-gray-100')
        setTextColor('text-white hover:text-black')
        setBorder('border border-white')
      }
    } else if (variant == 'accent') {
      if (!outlined) {
        setBgColor(
          'bg-mint-700 hover:bg-mint-600 active:bg-mint-700 disabled:bg-mint-200'
        )
        setTextColor('text-white')
        setBorder(
          'border border-mint-700 hover:border-mint-600 active:border-mint-500 disabled:border-mint-800'
        )
      } else {
        setBgColor(
          'bg-transparent hover:bg-mint-300 active:bg-mint-400 disabled:bg-transparent'
        )
        setTextColor('text-mint-300 hover:text-black disabled:text-black')
        setBorder('border border-mint-300')
      }
    } else {
      if (!outlined) {
        setBgColor(
          'bg-white hover:bg-gray-100 active:bg-gray-200 disabled:bg-white/70'
        )
        setTextColor('text-black hover:text-black/75')
        setBorder('border border-white hover:border-gray-100')
      } else {
        setBgColor('bg-transparent hover:bg-gray-100')
        setTextColor('text-white hover:text-black')
        setBorder('border border-white')
      }
    }
  }, [size, variant, outlined])

  useEffect(() => {
    if (square) {
      setDimensions('w-10 h-10')
      if (size === 'sm') {
        setPadding('p-1')
      } else if (size === 'md') {
        setPadding('p-1.5')
      } else {
        setPadding('p-2')
      }
    } else {
      if (size === 'sm') {
        setPadding('px-3 py-1')
      } else if (size === 'md') {
        setPadding('px-5 py-1.5')
      } else {
        setPadding('px-6 py-2')
      }
    }
  }, [size, square])

  if (!padding && !bgColor && !textColor && !border) return null
  if (elementType === 'button' || !href) {
    return (
      <button
        className={classNames(
          padding,
          bgColor,
          textColor,
          border,
          dimensions,
          radius !== 'none' ?? radius === 'sm'
            ? 'rounded'
            : `rounded-${radius}`,
          `whitespace-nowrap`,
          `flex items-center justify-center `,
          `rounded-${radius} text-sm font-medium shadow transition-all duration-100 ease-in`,
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  } else {
    return (
      <Link
        className={classNames(
          padding,
          bgColor,
          textColor,
          border,
          dimensions,
          radius !== 'none' ?? radius === 'sm'
            ? 'rounded'
            : `rounded-${radius}`,
          `whitespace-nowrap`,
          `flex items-center justify-center`,
          `rounded-${radius} text-sm font-medium shadow transition-all duration-100 ease-in`,
          className
        )}
        scroll={scroll}
        as={as}
        href={href}
        {...props}
      >
        {children}
      </Link>
    )
  }
}
