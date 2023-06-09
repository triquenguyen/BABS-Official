import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setShowAccount } from "../../redux/showAccountSlice"
import { RootState } from "@/libs/store"

export default function DepositBtn() {
  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.showAccount.showAccount)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowAccount(false)) : dispatch(setShowAccount(true))}
      className="flex p-8 bg-[#69C9D0] w-[14em] h-[14em] bg-opacity-70 rounded-md flex-col items-center justify-center gap-4">
      <Image src="/Icon.svg" width={80} height={100} alt='bg' />
      <button className="">Account Manager</button>
    </motion.div>
  )
}