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
    return null;
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