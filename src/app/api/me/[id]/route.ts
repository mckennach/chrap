import { NextResponse } from 'next/server'
import client from '@/lib/apollo'
import { GET_USER } from '@/lib/apollo/queries/users.queries'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const { data, error } = await client.query({
    query: GET_USER,
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  })

  if (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    )
  }

  console.log(data)

  return NextResponse.json({
    data,
  })
}
