'use client'

import { useEffect, useState } from 'react'

// Components
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'

// Utils
import classNames from 'classnames'
import Button from '@ui/button'
import { SessionProps } from '@/types/session.types'
import HeaderAuth from './header-auth'
import HeaderUserDropdown from './header-user-dropdown'
import Logo from '../icons/logo'
import Input from '../ui/input'
import { Session } from '@supabase/supabase-js'

export default function Header({ session }: { session: Session | null }) {
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  return (
    <header className="dark:bg-cape-cod-900 bg-cape-cod-600 sticky top-0">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/">
              <span className="sr-only">Home</span>
              <Logo size={32} />
            </Link>
          </div>

          <div className="hidden md:block">
            <form autoComplete='off'>
              <Input
                id="search"
                autoComplete="off"
                placeholder="Search"
                value=""
                icon={<Search size="16" className="text-gray-400" />}
                className="rounded-full w-full py-2"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            {!session ? (
              <HeaderAuth />
            ) : (
              <HeaderUserDropdown session={session} />
            )}
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
