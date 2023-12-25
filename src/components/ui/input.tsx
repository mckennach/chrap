import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'

interface InputProps {
  id: string
  placeholder: string
  type?: string
  value?: string
  icon?: React.ReactNode
  autoComplete?: string
  className?: string
}

export default function Input({
  id,
  placeholder,
  type,
  icon,
  value,
  autoComplete,
  className,
  ...props
}: InputProps) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {id}
      </label>
      <div className="relative">
        <input
          {...props}
          id={id}
          autoComplete={autoComplete}
          type={type ? type : 'text'}
          className={classNames(className, `input-primary`)}
          placeholder={placeholder}
        />
        {icon && (
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            {icon}
          </span>
        )}
      </div>
    </>
  )
}
