import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'

// Components
import toast from 'react-hot-toast'
import Link from 'next/link'
import Button from '@ui/button'
import { AtSign, Eye, EyeOff, User } from 'lucide-react'

// Utils
import { debounce } from 'lodash'
import Input from '../ui/input'

type RegisterProps = {
  name: string
  username: string
  email: string
  password: string
  confirm_password: string
}

export default function RegisterForm({
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
  const methods = useForm<RegisterProps>()
  const {
    watch,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    const resp = await fetch('/api/auth/register', {
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
      toast.error('Error creating account, please try again')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        action=""
        className="mx-auto mb-0 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="mb-3">
          <Input
            {...register('name', { required: 'Name is required' })}
            id="name"
            placeholder="Name"
            icon={<User size="16" className="text-gray-400" />}
          />
          {errors.name && (
            <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
          )}
        </fieldset>

        <fieldset className="mb-3">
          <Input
            {...register('username', { required: 'Username is required' })}
            id="username"
            placeholder="Username"
            icon={<User size="16" className="text-gray-400" />}
          />
          {errors.username && (
            <p className="text-sm text-red-400 mt-1">
              {errors.username.message}
            </p>
          )}
        </fieldset>

        <fieldset className="mb-3">
          <Input
            id="email"
            placeholder="Email"
            type="email"
            icon={<AtSign size="16" className="text-gray-400" />}
            {...register('email', { required: 'Email is required' })}
          />

          {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
          )}
        </fieldset>

        <fieldset className="mb-3">
          <Input
            id="password"
            placeholder="Password"
            type="password"
            icon={
              showPassword ? (
                <EyeOff size="16" className="text-gray-400" />
              ) : (
                <Eye size="16" className="text-gray-400" />
              )
            }
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-sm text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </fieldset>

        <fieldset className="mb-3">
          <Input
            id="confirm_password"
            placeholder="Confirm Password"
            type="password"
            icon={
              showConfirmPassword ? (
                <EyeOff size="16" className="text-gray-400" />
              ) : (
                <Eye size="16" className="text-gray-400" />
              )
            }
            {...register('confirm_password', {
              required: true,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match'
                }
              },
            })}
          />

          {errors.confirm_password && (
            <p className="text-sm text-red-400 mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </fieldset>

        <fieldset className="flex items-center justify-between space-x-2">
          <p className="text-sm text-gray-500 space=x-2">
            Already have an account?{` `}
            <button
              className="text-blue-400 hover:text-blue-400/70"
              type="button"
              onClick={() => setFormType('login')}
            >
              Login
            </button>
          </p>
        </fieldset>

        <fieldset className="flex items-center justify-between space-x-2 !mt-10">
          <Button
            type="submit"
            radius="full"
            className="w-full"
            variant="primary"
          >
            Sign up
          </Button>
        </fieldset>
      </form>
    </FormProvider>
  )
}
