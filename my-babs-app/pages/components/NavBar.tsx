import Link from "next/link"

export default function Navbar() {
  return (
    <div className="gap-4 flex">
      <Link href={"/login"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Login</Link>
      <Link href={"/signup"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Sign Up</Link>
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
