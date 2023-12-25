import { UserProps } from '@/types/users.types'
import { atom } from 'jotai'

export const userAtom = atom<UserProps | null>(null)
