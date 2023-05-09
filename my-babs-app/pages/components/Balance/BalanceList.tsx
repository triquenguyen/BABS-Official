import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShow } from '../../redux/showSlice'
import BalanceCard from './BalanceCard'
import { setAccountId } from '@/pages/redux/accountIdSlice'
import Balance from './BalanceCard'

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

export default function DepositCheck({ handleClose, accounts }) {
  const dispatch = useDispatch()

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col gap-2 bg-[#080325] bg-opacity-60 rounded-md pt-4 pb-8 px-8 max-h-[80%] items-center justify-center'
      >
        <Image src='/close.png' width={25} height={25} alt='bg' onClick={handleClose} className='ml-auto hover:scale-110 active:scale-90' />

        <h1 className='text-2xl text-[#69C9D0] '>Your Accounts</h1>
        <div className='overflow-y-auto'>
          {accounts?.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              key={index}
              className='min-w-[100%] mb-4'
              onClick={() => dispatch(setAccountId(index))}
            >
              <BalanceCard
                type={item.type}
                balance={item.balance}
                accountId={item.id}
              />
            </motion.div>
          ))}
        </div>


      </motion.div>
    </Backdrop >

  )
}