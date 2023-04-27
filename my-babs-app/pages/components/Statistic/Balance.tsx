"use client"

import { IBM_Plex_Mono } from "next/font/google"

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400"
})

export default function Balance({ amount }) {
  return (
    <div className="rounded-md w-[30%] bg-[#69C9D0] p-8 bg-opacity-70 gap-2 flex flex-col">
      <h1 className="text-xl">Checking Account</h1>
      <div className="flex">
        <h2 className="mr-auto">$</h2>
        <p className={`text-5xl ${plexMono.className}`}>{amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
      </div>
      <h1 className="ml-auto">Available Balance</h1>

    </div>
  )
}