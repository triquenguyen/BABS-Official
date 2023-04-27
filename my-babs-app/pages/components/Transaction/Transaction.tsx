import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { getSession } from 'next-auth/react'
import { prisma } from '@/libs/prisma'
import TransactionCard from './TransactionCard'

interface Transaction {
  transactionType: string
  createdAt: string
  amount: number
  balanceBefore: number
  balanceAfter: number
  receiverEmail: string
  senderEmail: string
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

interface Props {
  handleClose: () => void
  transactions: Transaction[]
}

export default function Transaction({ handleClose, transactions }) {
  const dispatch = useDispatch()

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col gap-2 bg-[#080325] bg-opacity-60 rounded-md py-4 pb-8 px-8 max-h-[80%] items-center justify-center'
      >
        <Image src='/close.png' width={25} height={25} alt='bg' onClick={handleClose} className='ml-auto hover:scale-110 active:scale-90' />
        <h1 className='text-2xl text-[#69C9D0] mb-2'>Transaction History</h1>
        <div className='flex gap-8 text-[#69C9D0]'>
          <h1 className='mr-4'>Type</h1>
          <h1 className='mr-4'>Amount</h1>
          <h1 className='mr-6'>Date</h1>
          <h1 className='mr-6'>Before</h1>
          <h1 className='mr-4'>After</h1>
        </div>
        <div className='overflow-y-auto'>
          {transactions?.map((item, index) => (
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
            >
              <TransactionCard
                type={item.transactionType}
                amount={item.amount}
                date={item.createdAt.slice(0, 10)}
                balanceBefore={item.accountBefore}
                balanceAfter={item.accountAfter}
                receiver={item.receiverEmail}
                sender={item.senderEmail}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Backdrop >

  )
}
