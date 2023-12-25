import { useState, useEffect } from 'react'
import Modal from '@ui/modal'
import RegisterForm from './register-form'
import LoginForm from './login-form'
import Link from 'next/link'
import Button from '../ui/button'
import ProviderButtons from './provider-buttons'
export default function UserAuthModal({
  formType,
  open,
  setOpen,
  setFormType,
}: {
  formType: 'login' | 'register'
  open: boolean
  setOpen: (value: boolean) => void
  setFormType: (value: 'login' | 'register') => void
}) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (formType === 'login') {
      setTitle('Login')
    } else {
      setTitle('Register')
    }
  }, [formType])

  return (
    <Modal title={title} open={open} setOpen={setOpen}>
      <div className="text-sm mb-8">
        <p>
          By continuing, you agree to our{' '}
          <Link
            href="/policies/user-agreement"
            className="text-blue-400 hover:text-blue-400/70"
          >
            User Agreement
          </Link>{' '}
          and acknowledge that you understand the{' '}
          <Link
            href="/policies/privacy-policy"
            className="text-blue-400 hover:text-blue-400/70"
          >
            Privacy Policy.
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        <ProviderButtons />
        <div className="flex items-center">
          <hr className="h-px grow bg-[#303030] border-none m-0" />
          <span className="text-12 text-tone-2 px-[1rem]">OR</span>
          <hr className="h-px grow bg-[#303030] border-none m-0" />
        </div>

        {formType === 'login' ? (
          <LoginForm open={open} setOpen={setOpen} setFormType={setFormType} />
        ) : (
          <RegisterForm
            open={open}
            setOpen={setOpen}
            setFormType={setFormType}
          />
        )}
      </div>
    </Modal>
  )
}
