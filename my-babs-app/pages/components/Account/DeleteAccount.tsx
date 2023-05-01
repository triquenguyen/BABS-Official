import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShowAccount } from '../../redux/showAccountSlice'

interface DeleteAccountProps {
  id: number
  accountId: number
  password: string
}

const initialDeleteAccount: DeleteAccountProps = {
  id: 0,
  accountId: 0,
  password: ''
}

export default function CreateAccount({ id }) {
  const [form, setForm] = useState<DeleteAccountProps>(initialDeleteAccount)
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

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/deleteaccount', form)
      if (res.status === 200) {
        console.log("Form submitted", res)
        setForm(initialDeleteAccount)
        dispatch(setShowAccount(false))
        alert(res.data.message)
        refreshData()
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div>
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-6">
        <input
            type="number"
            value={form.accountId}
            name='accountId'
            onChange={handleChange}
            placeholder='Account ID'
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          />

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
            Delete Account
          </motion.button>
        </form>
    </div>
  )
}