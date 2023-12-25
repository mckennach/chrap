import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import createSuperbaseServerClient from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, provider, type } = body
  const supabase = await createSuperbaseServerClient()
  // const cookieStore = cookies();

  // const supabase = createRouteHandlerClient<Database>({
  //   cookies: () => cookieStore,
  // });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return NextResponse.json({ data, error })
}
