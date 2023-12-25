import { ChevronsUp } from "lucide-react"

export default function Messenger() {
  return (
    <footer className="sticky bottom-0 w-full ">
      <div className="container mx-auto flex justify-end">
        <div className="relative z-50 p-4 bg-cape-cod-700 shadow shadow-cape-cod-950 rounded-t-lg flex justify-between w-28">
          Messages
          <ChevronsUp />
        </div>
      </div>   
    </footer>
  )
}