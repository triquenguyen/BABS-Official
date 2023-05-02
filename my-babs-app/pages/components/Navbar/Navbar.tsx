import Link from "next/link"
import Image from "next/image"
import ProfileBtn from "../Profile/ProfileBtn"

export default function Navbar({ username, callbackUrl = "/login" }) {
  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: callbackUrl })
  }
  return (
    <div className="flex items-center justify-items-center h-16">
      <Link href="/" className="mr-auto items-center"><Image src="/babs-logo.svg" alt="logo" width={200} height={50} /></Link>
      <h1 className="mr-auto text-5xl font-bold text-[#080325]" >Dashboard</h1>
      <div className="flex gap-2 items-center">
        <h1 className='text-[#080325]'>Welcome back <div className="font-bold text-[#080325]">{username}</div></h1>
        <ProfileBtn />
      </div>

    </div>
  )
}

// import Link from 'next/link'

// export default function Navbar() {
//   return (
//     <nav className="py-5 bg-[#080325]" >
//       <Link href="/accounts" className="px-3 text-[#519BA1]">Accounts</Link>
//       <Link href="/transfer" className="px-3 text-white">Transfer</Link>
//       <Link href="/settings" className="px-3 text-white">Settings</Link>
//       <Link href="/support" className="px-3 text-white">Support</Link>
//     </nav>
//   )
// }
