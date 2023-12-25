import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_STEPZEN_ENDPOINT as string,
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
    credentials: 'same-origin',
  }),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache(),
})

export default client
