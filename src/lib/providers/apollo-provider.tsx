'use client'

import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import client from '../apollo'

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
)
