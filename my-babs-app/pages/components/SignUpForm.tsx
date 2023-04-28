"use client"

import { useState } from "react"
import axios from 'axios'
import Link from "next/link"
import Router from "next/router"

interface FormProps {
  username: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPass: string,
  pincode: string,
}

const initialForm: FormProps = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPass: '',
  pincode: ''
}

export default function SignUpForm() {
  const [form, setForm] = useState<FormProps>(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/signup', form)
      console.log("Form submitted", res)
      setForm(initialForm)
      Router.push('/login')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col items-center gap-[16px] ">
      <h1 className="text-[42px] font-bold text-[#69C9D0]">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] items-center ">
        <div className="flex gap-[20px]">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[170px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />
        </div>
        <input
          type="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username" className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <input
          type="password"
          name="confirmPass"
          value={form.confirmPass}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />

        <input
          type="password"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[360px] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-2 mt-2" />
        
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]">Sign Up</button>
        <p className="text-white">Already have an account? <Link href="/login" className="underline underline-offset-2">Login Here</Link></p>
      </form>
    </div>
  )
}

