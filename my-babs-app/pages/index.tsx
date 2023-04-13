"use client"

import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import { useState, useEffect } from "react"
import axios from 'axios'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [test, setTest] = useState<string>("")

  return (
    <main>
      <div className={`${montserrat.className} gap-4 flex`}>
        <Link href={"/login"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Login</Link>
        <Link href={"/signup"} className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Sign Up</Link>
        {test}
      </div>
    </main>
  )
}
