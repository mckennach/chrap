'use client'

import { useEffect } from 'react'
import { userAtom } from '@/lib/atoms/users'
import { Session } from '@supabase/supabase-js'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import type { UserProps } from '@/types/users.types'

export default function AppContainer({
  children,
  session,
  user,
}: {
  children: React.ReactNode
  session: Session | null
  user: UserProps
}) {
  const [userData, setUserData] = useAtom(userAtom)
  useHydrateAtoms([[userAtom, user]])
  useEffect(() => {
    console.log('user', user);
    setUserData(user)
  }, [user])
  return <>{children}</>
}
