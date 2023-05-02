"use client"

import { IBM_Plex_Mono } from "next/font/google"
import { useDispatch, useSelector } from "react-redux";
import { setShowBalance } from "@/pages/redux/showBalanceSlice";
import { RootState } from "@/libs/store";
import { motion } from "framer-motion";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400"
})

interface accountProps {
  accountId: number,
  balance: number,
  type: string,
}

export default function Balance(account: accountProps) {
  if (!account || !account.balance) {
    return null;
  }

  const dispatch = useDispatch()

  return (
    <div
      className="rounded-md bg-[#69C9D0] p-8 bg-opacity-70 gap-2 flex flex-col">
      <h1 className="text-xl">{account.type} ({account.accountId})</h1>
      <div className="flex">
        <h2 className="mr-auto">$</h2>
        <p className={`text-5xl ${plexMono.className}`}>{account.balance.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
      </div>
      <h1 className="ml-auto">Available Balance</h1>
    </div>
  )
}