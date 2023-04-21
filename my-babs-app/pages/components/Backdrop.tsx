import { motion } from "framer-motion"

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      {children}
    </motion.div>
  )
}