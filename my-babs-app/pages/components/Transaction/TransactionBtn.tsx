import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/libs/store"
import { setShowTransaction } from "../../redux/showTransactionSlice"

export default function DepositBtn() {
  const dispatch = useDispatch()
  const show = useSelector((state:RootState) => state.showTransaction.showTransaction)

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowTransaction(false)) : dispatch(setShowTransaction(true)) }
      className="flex p-8 bg-[#69C9D0] bg-opacity-70 rounded-md flex-col items-center justify-center gap-4">
      <Image src="/transaction.svg" width={80} height={100}alt='bg' />
      <button className="">Transaction History</button>
    </motion.div>
  )
}