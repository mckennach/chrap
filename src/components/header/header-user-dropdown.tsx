import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/lib/atoms/users'

// Components
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'

// Lib / utils
import client from '@/lib/apollo'
import createSupabaseClient from '@/lib/supabase/client'
import classNames from 'classnames'
import { imageLoader } from '@/utils/images'

// Types
import type { Session } from '@supabase/supabase-js'

export default function HeaderUserDropdown({ session }: { session: Session }) {
  const user = useAtomValue(userAtom)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const supabase = createSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleSignOut = async (e: any) => {
    e.preventDefault()
    const resp = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    client.clearStore().then(() => {
      client.resetStore()
      router.refresh()
    })

    if (resp.status === 200) {
      router.refresh()
    }
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ring-2 ring-supernova-400 focus:outline-none  ring-offset-2 ring-offset-gray-800 active:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {user?.avatar ? (
            <Image
              loader={imageLoader}
              className="h-8 w-8 rounded-full"
              src={
                user?.avatar || '/placeholder.png'
              }
              alt={
                `${user?.name} Avatar ` || 'User avatar'
              }
              priority={true}
              width={32}
              height={32}
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-cape-palliser-500 flex items-center justify-center">
              {user?.name[0]}
            </div>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            `absolute right-0 z-10 mt-2 w-48 origin-top-right`,
            `divide-y dark:divide-cape-cod-400 divide-cape-cod-200`,
            `dark:bg-cape-cod-500 bg-cape-cod-300`,
            `ring-1 dark:ring-black ring-white ring-opacity-5 focus:outline-none`,
            `rounded-md p-0 shadow-lg`
          )}
        >
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'dark:bg-cape-cod-700 bg-cape-cod-600' : '',
                    ' px-4 py-2 text-sm text-white w-full flex  items-center gap-1'
                  )}
                >
                  <User size="16" className="text-white" />
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'dark:bg-cape-cod-700 bg-cape-cod-600' : '',
                    'px-4 py-2 text-sm text-white w-full flex  items-center gap-1'
                  )}
                >
                  <Settings size="16" className="text-white" />
                  Settings
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    theme == 'dark' ? setTheme('light') : setTheme('dark')
                  }}
                  className={classNames(
                    active ? 'dark:bg-cape-cod-700 bg-cape-cod-600' : '',
                    'px-4 py-2 text-sm text-white w-full flex  items-center gap-1'
                  )}
                >
                  {currentTheme == 'dark' ? (
                    <Sun size="16" className="text-white" />
                  ) : (
                    <Moon size="16" className="text-white" />
                  )}
                  {currentTheme == 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={handleSignOut}
                  className={classNames(
                    active ? 'dark:bg-cape-cod-700 bg-cape-cod-600' : '',
                    ' px-4 py-2 text-sm text-white w-full flex  items-center gap-1'
                  )}
                >
                  <LogOut size="16" className="text-white" />
                  Log out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
