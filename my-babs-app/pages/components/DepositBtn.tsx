import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setShow } from "../redux/showSlice"
import { RootState } from "@/libs/store"

export default function DepositBtn() {
  const dispatch = useDispatch()
  const show = useSelector((state:RootState) => state.show.show)

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShow(false)) : dispatch(setShow(true)) }
      className="flex p-8 bg-[#69C9D0] bg-opacity-70 rounded-md flex-col items-center justify-center gap-4">
      <Image src="/deposit_check_icon.svg" width={140} height={100}alt='bg' />
      <button className="">Deposit Checks</button>
    </motion.div>
  )
}