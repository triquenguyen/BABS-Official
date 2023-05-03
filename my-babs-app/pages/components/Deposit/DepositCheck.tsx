import axios from 'axios'
import { useState, useEffect, ChangeEvent } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShow } from '../../redux/showSlice'
import { Account } from '@prisma/client'

interface DepositProps {
  amount: number
  id: number
  accountId: number
  password: string
}

const initialDeposit: DepositProps = {
  amount: 0,
  id: 0,
  accountId: 0,
  password: ''
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

export default function DepositCheck({ handleClose, id, accounts }) {
  const [form, setForm] = useState<DepositProps>(initialDeposit)
  const dispatch = useDispatch()

  const refreshData = () => {
    Router.replace(Router.asPath)
  }

  useEffect(() => {
    if (id) {
      setForm({ ...form, id: id })
    }
  }, [id, accounts])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/deposit', form)
      if (res.status === 200) {
        console.log("Form submitted", res)
        setForm(initialDeposit)
        dispatch(setShow(false))
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

        <h1 className='text-2xl text-[#69C9D0] '>Deposit Checks</h1>
        <form onSubmit={handleDeposit} className="flex flex-col gap-6">
          <input
            type="number"
            name='amount'
            onChange={handleChange}
            placeholder='Amount to Deposit'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <select
            name='accountId'
            onChange={handleChange}
            value={form.accountId}
            placeholder='Account ID'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          >
            <option value="">Select An Account</option>
            {accounts.map((account: Account) => (
              <option key={account.id} value={account.id}>
                {account.type + " " + account.id}
              </option>))}
          </select>

          <input
            type="password"
            value={form.password}
            name='password'
            onChange={handleChange}
            placeholder='Password'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-[#69C9D0] rounded-md text-white"
          >
            Deposit
          </motion.button>
        </form>
      </motion.div>
    </Backdrop >

  )
}