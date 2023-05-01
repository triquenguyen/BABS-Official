import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setShowProfile } from "../../redux/showProfileSlice"
import { RootState } from "@/libs/store"

export default function DepositBtn() {
  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.showProfile.showProfile)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => show ? dispatch(setShowProfile(false)) : dispatch(setShowProfile(true))}>
      <Image src="/account.png" alt="logo" height={100} width={100} className="w-10 h-10" />
    </motion.div>
  )
}