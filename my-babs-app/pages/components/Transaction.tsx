import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShow } from '../redux/showSlice'

interface Transaction {
  amount: number
  id: number
}

const initialDeposit: DepositProps = {
  amount: 0,
  id: 0
}

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 500,
      damping: 25,
    }
  },
  exit: {
    y: "100vh",
    opacity: 0,
  }
}

export default function DepositCheck({ handleClose, id }) {
  const [form, setForm] = useState<DepositProps>(initialDeposit)
  const dispatch = useDispatch()

  const refreshData = () => {
    Router.replace(Router.asPath)
  }

  useEffect(() => {
    if (id) {
      setForm({ ...form, id: id })
    }
  }, [id])

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col gap-2 bg-[#080325] bg-opacity-60 rounded-md pt-4 pb-8 px-8 items-center justify-center'
      >
        <Image src='/close.png' width={25} height={25} alt='bg' onClick={handleClose} className='ml-auto hover:scale-110 active:scale-90' />

      </motion.div>
    </Backdrop >

  )
}