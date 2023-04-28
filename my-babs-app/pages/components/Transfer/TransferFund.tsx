import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShowTransfer } from '../../redux/showTransferSlice'

interface TransferProps {
  amount: number
  id: number
  receiverUsername: string
}

const initialTransfer: TransferProps = {
  amount: 0,
  id: 0,
  receiverUsername: ''
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

export default function TransferFund({ handleClose, id }) {
  const [form, setForm] = useState<TransferProps>(initialTransfer)
  const dispatch = useDispatch()

  const refreshData = () => {
    Router.replace(Router.asPath)
  }

  useEffect(() => {
    if (id) {
      setForm({ ...form, id: id })
    }
  }, [form, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/transfer', form)
      if (res.status === 200) {
        console.log("Form submitted", res)
        setForm(initialTransfer)
        dispatch(setShowTransfer(false))
        alert(res.data.message)
        refreshData()
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

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

        <h1 className='text-2xl text-[#69C9D0]'>Transfer Funds</h1>
        <form onSubmit={handleDeposit} className="flex flex-col gap-6">
          <input
            type="number"
            value={form.amount}
            name='amount'
            onChange={handleChange}
            placeholder='Amount to Transfer'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />
          <input
            type="username"
            value={form.receiverUsername}
            name='receiverUsername'
            onChange={handleChange}
            placeholder='Receiver Username'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-[#69C9D0] rounded-md text-white"
          >
            Transfer
          </motion.button>
        </form>
      </motion.div>
    </Backdrop >

  )
}