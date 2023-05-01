import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setShowAccount } from '../../redux/showAccountSlice'

interface CreateAccountProps {
  id: number
  type: string
  password: string
}

const initialCreateAccount: CreateAccountProps = {
  id: 0,
  type: '',
  password: ''
}

export default function CreateAccount({ id }) {
  const [form, setForm] = useState<CreateAccountProps>(initialCreateAccount)
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/account', form)
      if (res.status === 200) {
        console.log("Form submitted", res)
        setForm(initialCreateAccount)
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
          <select
            value={form.type}
            name='type'
            onChange={handleSelectChange}
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[20em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2"
          >
            <option value="">Select account type</option>
            <option value="Checking Account" className='text-black'>Checking Account</option>
            <option value="Saving Account" className='text-black'>Saving Account</option>
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
            Create Account 
          </motion.button>
        </form>
    </div>
  )
}