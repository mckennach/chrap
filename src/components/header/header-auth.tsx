import { useState, useEffect } from 'react'

// Components
import Button from '@ui/button'
import Login from '@/components/user-auth/login-form'
import Register from '@/components/user-auth/register-form'

// Types
import type { SessionProps } from '@/types/session.types'
import UserAuthModal from '../user-auth/user-auth-modal'
import { set } from 'react-hook-form'

export default function HeaderAuth() {
  const [formType, setFormType] = useState<'login' | 'register'>('login') // ["login", "register"]
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalToggle = (type: 'login' | 'register') => {
    setFormType(type)
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <div className="sm:flex sm:gap-2">
        <Button
          onClick={() => handleModalToggle('login')}
          href="/"
          size="md"
          variant="secondary"
          radius="full"
          elementType="button"
        >
          Login
        </Button>
        <div className="hidden sm:flex">
          <Button
            onClick={() => handleModalToggle('register')}
            href="/"
            size="md"
            variant="primary"
            radius="full"
            elementType="button"
          >
            Sign up
          </Button>
        </div>
      </div>

      <>
        <UserAuthModal
          formType={formType}
          open={modalOpen}
          setOpen={setModalOpen}
          setFormType={setFormType}
        />
      </>
    </>
  )
}
