import { useState } from "react"
import classNames from "classnames"

export default function Divider({ ...props }: { className?: string }) {
  return (
    <div className={classNames(
      `h-px flex-1 w-full my-2`,
      props.className
      )}></div>
  )
}