import toast from 'react-hot-toast'

const ToastResults = ({ data }: any) => {
  return toast.custom(
    (t) => (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-sm text-white">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    ),
    {
      position: 'bottom-right',
    }
  )
}

export default ToastResults
