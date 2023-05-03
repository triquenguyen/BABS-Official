import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setShowWithdraw } from "../../redux/showWithdrawSlice"
import { RootState } from "@/libs/store"

export default function WithdrawBtn() {
  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.showWithdraw.showWithdraw)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowWithdraw(false)) : dispatch(setShowWithdraw(true))}
      className="flex p-8 bg-[#69C9D0] bg-opacity-70 w-[14em] h-[14em] rounded-md flex-col items-center justify-center gap-4">
      <Image src="/withdraw.svg" width={75} height={100} alt='bg' />
      <button className="">Withdraw Money</button>
    </motion.div>
  )
}