import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShowProfile } from '../../redux/showProfileSlice'
import { signOut } from 'next-auth/react'

interface ProfileProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  newPassword: string,
  confirmPassword: string,
}

const initialProfile: ProfileProps = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
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

export default function Profile({ handleClose, id, firstName, lastName, email }) {
  const [form, setForm] = useState<ProfileProps>(initialProfile)
  const dispatch = useDispatch()

  const refreshData = () => {
    Router.replace(Router.asPath)
  }

  useEffect(() => {
    if (id) {
      setForm({ ...form, id: id })
      setForm({ ...form, firstName: firstName })
      setForm({ ...form, lastName: lastName })
      setForm({ ...form, email: email })
    }
  }, [form, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/profile', form)
      if (res.status === 200) {
        console.log("Form submitted", res)
        setForm(initialProfile)
        dispatch(setShowProfile(false))
        alert(res.data.message)
        refreshData()
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/login' })
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

        <h1 className='text-2xl text-[#69C9D0] '>Profile</h1>
        <form onSubmit={handleDeposit} className="flex flex-col gap-2">
          <input
            type="type"
            name='firstName'
            value={form.firstName}
            onChange={handleChange}
            placeholder={firstName}
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <input
            type="type"
            name='lastName'
            value={form.lastName}
            onChange={handleChange}
            placeholder={lastName}
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <input
            type="type"
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder={email}
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <input
            type="password"
            name='newPassword'
            onChange={handleChange}
            placeholder='New Password'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <input
            type="password"
            name='confirmPassword'
            onChange={handleChange}
            placeholder='Confirm Password'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <input
            type="password"
            name='password'
            onChange={handleChange}
            placeholder='Password'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 w-full bg-[#69C9D0] rounded-md text-white mr-auto mt-2"
          >
            Save Changes
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-[#69C9D0] rounded-md text-white mt-6"
            onClick={handleSignout}
          >
            Sign Out
          </motion.button>

        </form>
      </motion.div>
    </Backdrop >
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  return {
    props: {
      id
    }
  }
}