import Link from "next/link"
import Image from "next/image"

export default function Navbar({ username }) {
  return (
    <div className="flex items-center justify-items-center h-16">
      <Link href="/" className="mr-auto items-center"><Image src="/babs-logo.svg" alt="logo" width={200} height={50} /></Link>
      <h1 className="mr-auto text-4xl font-bold" >Dashboard</h1>
      <Link href="/setting" className="flex gap-2 items-center">
        <h1 className='text-black'>{username}</h1>
        <Image src="/account.png" alt="logo" height={100} width={100} className="w-10 h-10"/>
      </Link>

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
