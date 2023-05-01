import Link from "next/link"
import Image from "next/image"
import ProfileBtn from "../Profile/ProfileBtn"

export default function Navbar() {
  return (
    <div className="flex items-center justify-items-center h-16 gap-4">
      <Link href="/" className="mr-auto items-center"><Image src="/babs-logo.svg" alt="logo" width={200} height={50} /></Link>
      <Link href={"/login"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white hover:scale-105 active:95">Login</Link>
      
      <Link href={"/atm/login"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white hover:scale-105 active:95">ATM</Link>
    </div>
  )
}