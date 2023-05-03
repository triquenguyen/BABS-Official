"use client"

import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import { useState, useEffect } from "react"
import axios from 'axios'
import NavbarHome from './components/Navbar/NavbarHome'
import Typewriter from 'typewriter-effect';
import Footer from './components/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${montserrat.className}`}>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block min-h-screen z-[-1]" alt='bg' />

      <div className="px-16 py-6"
        style={{ height: "100vh", overflowY: "hidden" }}>
        <NavbarHome />
        <div className="flex flex-col items-center justify-center gap-12 text-white" style={{ overflowY: "hidden", height: "80vh" }}>
          <h1
            className="px-20 text-5xl font-bold"
          >
            Welcome to Bay Area Banking Service
          </h1>
          <div className="flex text-5xl gap-4 font-bold">
            <h1>We are</h1>
            <Typewriter
              className="text-[#69C9D0]"
              options={{
                strings: ['Trustworthy', 'Reliable', 'Secure', 'Fast', 'Easy to use', 'Accessible', 'Convenient'],
                autoStart: true,
                loop: true,
              }}
            />
            
          </div>
          <Link href={"/signup"} className="px-3 py-2 text-xl bg-[#69C9D0] rounded-md text-white hover:scale-105 active:95">Get Started Here</Link>
        </div>
        <Footer />
      </div>
    </main>
  )
}
