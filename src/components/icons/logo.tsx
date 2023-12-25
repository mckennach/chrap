export default function Logo({
  size = 24,
  ...props
}: {
  size?: number | string
  className?: string
}) {
  return (
    <div className={`w-[${size}px] h-[${size}px]`}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle
          className="cls-1"
          cx="50"
          cy="50"
          r="50"
          strokeWidth="0px"
          fill="#facc15"
        />
        <circle
          className="cls-2"
          cx="28.5"
          cy="41.5"
          r="15.5"
          strokeWidth="0px"
          fill="#fff"
        />
      </svg>
    </div>
  )
}
