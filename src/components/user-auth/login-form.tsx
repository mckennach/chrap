import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
// Components
import Link from 'next/link'
import Button from '@ui/button'
import { AtSign, Eye, EyeOff, User } from 'lucide-react'
import toast from 'react-hot-toast'

// Utils
import { debounce } from 'lodash'
import Input from '../ui/input'

type LoginProps = {
  email: string
  password: string
}

export default function LoginForm({
  open,
  setOpen,
  setFormType,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  setFormType: (value: 'login' | 'register') => void
}) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const methods = useForm<LoginProps>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const res = await resp.json()
    if (res.error) {
      toast.error(res.error.message)
      return
    }

    if (resp.status === 200) {
      router.refresh()
    } else {
      toast.error('Something went wrong, please try again.')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        action=""
        className="mx-auto mb-0  w-full space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            icon={<AtSign size="16" className="text-gray-400" />}
            {...register('email', { required: 'Email is required' })}
          />

          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
        </fieldset>

        <fieldset>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            icon={
              showConfirmPassword ? (
                <EyeOff size="16" className="text-gray-400" />
              ) : (
                <Eye size="16" className="text-gray-400" />
              )
            }
            {...register('password', { required: 'Password is required' })}
          />

          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
        </fieldset>
        <fieldset className="flex items-center justify-between space-x-2">
          <p className="text-sm text-gray-500 space=x-2">
            New to Chrap?{` `}
            <button
              className="text-blue-400 hover:text-blue-400/70"
              type="button"
              onClick={() => setFormType('register')}
            >
              Sign up
            </button>
          </p>
        </fieldset>
        <fieldset className="flex items-center justify-between space-x-2 !mt-10">
          <Button
            type="submit"
            radius="full"
            className="w-full"
            // disabled={true}
          >
            Login
          </Button>
        </fieldset>
      </form>
    </FormProvider>
  )
}
