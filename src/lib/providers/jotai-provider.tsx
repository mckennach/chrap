'use client'

import { Provider, createStore } from 'jotai'
import { store } from '../atoms'
export default function JotaiProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // const store = createStore();
  return <Provider store={store}>{children}</Provider>
}
