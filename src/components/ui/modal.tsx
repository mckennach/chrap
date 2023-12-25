'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import classNames from 'classnames'

interface ModalProps {
  children: React.ReactNode
  title: string
  open: boolean
  setOpen: (value: boolean) => void
}

export default function Modal({ children, title, open, setOpen }: ModalProps) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-cape-cod-950 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-cape-cod-950 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg max-w-xl min-w-[90%] sm:min-w-min">
                <div className="bg-cape-cod-950 px-4 py-6 sm:px-6 sm:py-10">
                  <button
                    className={classNames(
                      `absolute right-3 top-2 p-1.5`,
                      `rounded-full w-8 h-8 flex items-center justify-center`,
                      `bg-transparent hover:bg-black/40`,
                      `transition-all duration-200 ease-in-out`
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>
                  <div className="max-w-[25rem] mx-auto">
                    <div className="text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-white"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">{children}</div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
