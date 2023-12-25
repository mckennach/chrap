'use client'

import GoogleIcon from '../icons/google'
import Button from '../ui/button'
import toast from 'react-hot-toast'
import createSupabaseClient from '@/lib/supabase/client'
// lib
// import { supabase } from "@/lib/supabase/supabase"
import type { Provider } from '@supabase/supabase-js'
import GithubIcon from '../icons/github'

export default function ProviderButtons() {
  const supabase = createSupabaseClient()
  const handleProviderLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?provider=1`,
      },
    })
    if (error) toast.error('Something went wrong, please try again.')
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={() => handleProviderLogin('google')}
        className="w-full relative flex justify-between items-center"
        radius="full"
      >
        <GoogleIcon size="18" className="absolute" />
        <span className="overflow-hidden text-ellipsis grow">
          Continue with Google
        </span>
      </Button>
      <Button
        onClick={() => handleProviderLogin('github')}
        className="w-full relative flex justify-between items-center"
        radius="full"
      >
        <GithubIcon size="18" className="absolute" />
        <span className="overflow-hidden text-ellipsis grow">
          Continue with Github
        </span>
      </Button>
    </div>
  )
}
