import '../styles/globals.css'

import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { ApolloProvider } from '@/lib/providers'
import JotaiProvider from '@/lib/providers/jotai-provider'

import Header from '@/components/header/header'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/components/sidebar/sidebar'

import type { Metadata } from 'next'
import type { Database } from '@/types/database.types'
import ThemeProvider from '@/lib/providers/theme-provider'
import AppContainer from '@/components/app-container'
import Messenger from '@/components/messenger/messenger'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chrap',
  description: 'CHRAP',
}

const fetchUser = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/me/${id}`)
  const resp = await res.json()

  if (!resp) {
    return null
  }

  return resp
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  let user = null
  let userAuth
  const {
    data: { session },
  } = await supabase.auth.getSession()

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN') {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userAuth = user
    } else {
      userAuth = null
    }
  })

  if (session) {
    user = await fetchUser(session.user.id)
    if (user) {
      user = user?.data?.user
    }
  }

  return (
    <html lang="en">
      <ApolloProvider>
        <JotaiProvider>
          <body
            className={`${inter.className} h-screen w-screen overflow-hidden`}
          >
            <ThemeProvider>
              <AppContainer session={session} user={user}>
                <Header session={session as any} />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1">{children}</main>
                </div>
                {session && (
                  <Messenger />
                )}
                <Toaster />
              </AppContainer>
            </ThemeProvider>
          </body>
        </JotaiProvider>
      </ApolloProvider>
    </html>
  )
}
