import dynamicIconImports from 'lucide-react/dynamicIconImports'

export interface SidebarNavProps {
  label: string
  slug: string
  path: string
  as: string
  icon: keyof typeof dynamicIconImports
}

export const sidebarNav: SidebarNavProps[] = [
  {
    label: 'Home',
    slug: 'home',
    path: '/',
    as: '/',
    icon: 'home',
  },
  {
    label: 'Popular',
    slug: 'popular',
    path: '/r/popular',
    as: '/r/popular',
    icon: 'rocket',
  },
  {
    label: 'All',
    slug: 'all',
    path: '/r/all',
    as: '/r/all',
    icon: 'zap',
  },
]
