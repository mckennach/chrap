import HomeView from '@/components/home/home'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <section>
      <h1>Home</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeView />
      </Suspense>
    </section>
  )
}
