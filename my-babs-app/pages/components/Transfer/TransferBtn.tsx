import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setShow } from "../../redux/showSlice"
import { RootState } from "@/libs/store"
import { setShowTransfer } from "../../redux/showTransferSlice"

export default function DepositBtn() {
  const dispatch = useDispatch()
  const showTransfer = useSelector((state: RootState) => state.showTransfer.showTransfer)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => showTransfer ? dispatch(setShowTransfer(false)) : dispatch(setShowTransfer(true))}
      className="flex p-8 bg-[#69C9D0] bg-opacity-70 rounded-md flex-col items-center justify-center gap-4">
      <Image src="/transfer_icon.svg" width={75} height={100} alt='bg' />
      <button className="">Transfer Funds</button>
    </motion.div>
  )
}