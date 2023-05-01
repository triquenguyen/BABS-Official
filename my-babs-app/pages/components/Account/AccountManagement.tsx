import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShowAccount } from '../../redux/showAccountSlice'
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteAccount'

interface AccountProps {
  type: string
}

const initialAccount: AccountProps = {
  type: '',
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

export default function Account({ handleClose, id }) {
  const [action, setAction] = useState('')
  
  const dispatch = useDispatch()
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(event.target.value)
  };


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

        <h1 className='text-2xl text-[#69C9D0] '>Account Manager</h1>
        <div className="flex flex-col gap-6">
          <select
            value={action}
            name='type'
            onChange={handleSelectChange}
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          >
            <option value="">Select action</option>
            <option value="Create Account" className='text-black'>Create New Account</option>
            <option value="Delete Account" className='text-black'>Delete Account</option>
          </select>

          {action === 'Create Account' && <CreateAccount id={id} />}
          {action === 'Delete Account' && <DeleteAccount id={id} />}
        </div>
      </motion.div>
    </Backdrop >

  )
}