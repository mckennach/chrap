import { Session } from '@supabase/supabase-js'

export interface SessionProps {
  access_token: string
  user: {
    id: string
    aud: string
    role: string
    email: string
    confirmed_at: string
    confirmation_sent_at: string
    last_sign_in_at: string
    created_at: string
    updated_at: string
    user_metadata: {
      full_name?: string
      name?: string
      avatar_url?: string
      picture?: string
      email?: string
    }
  }
}
