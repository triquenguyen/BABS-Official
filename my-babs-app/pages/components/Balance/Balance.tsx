"use client"

import { IBM_Plex_Mono } from "next/font/google"
import { useDispatch, useSelector } from "react-redux";
import { setShowBalance } from "@/pages/redux/showBalanceSlice";
import { RootState } from "@/libs/store";
import { motion } from "framer-motion";
import BalanceCard from "./BalanceCard";
import { setAccountId } from "@/pages/redux/accountIdSlice";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400"
})

interface accountProps {
  accountId: number,
  balance: number,
  type: string,
}

export default function Balance({ accounts }) {

  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.showBalance.showBalance)
  const id = useSelector((state: RootState) => state.accountId.accountId)
  if (!accounts || accounts.length <= id) {
    return (
      <div
        className="rounded-md bg-[#69C9D0] h-[14em] min-w-[26em] w-fit p-8 bg-opacity-70 gap-4 flex flex-col justify-center">
        <h1 className="text-xl font-bold">No Account Available</h1>
        <div className="flex flex-col gap-4">
          <h2 className="mr-auto"></h2>
          <h1 className="ml-auto">Please <span className="font-bold">Create New Account</span> in <span className="font-bold">Account Manager</span></h1>
          <h1 className="ml-auto">OR <span className="font-bold">Reload</span> to have accounts shown</h1>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowBalance(false)) : dispatch(setShowBalance(true))}
      className="rounded-md w-[30%]">
      <BalanceCard accountId={accounts[Number(id)]?.id} balance={accounts[Number(id)]?.balance} type={accounts[Number(id)]?.type} />
    </motion.div>
  )
}