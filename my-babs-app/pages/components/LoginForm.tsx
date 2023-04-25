"use client"

import { FormEventHandler, useState } from "react"
import { signIn } from "next-auth/react"
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'

interface FormProps {
  email: string
  password: string
}

const initialForm: FormProps = {
  email: '',
  password: ''
}

export default function LogInForm({ withCreate = true, callbackUrl = '/dashboard' }) {
  const [form, setForm] = useState<FormProps>(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      callbackUrl: callbackUrl,
      email: form.email,
      password: form.password
    })

    if (res?.ok) {
      Router.push("/dashboard")
    }

    if (res?.error) {
      alert(res.error)
    }

    setForm(initialForm)
  }

  return (
    <div className="flex flex-col items-center gap-[20px] w-[80%]">
      <h1 className="text-[42px] font-bold text-[#69C9D0]">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] items-center ">

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2" />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="text-[#69C9D0] bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2" />
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] bg-opacity-80 rounded-md text-white w-[25%] hover:bg-opacity-100">Login</button>
        <p className="text-white" hidden={!withCreate}>Not have an account? <Link href="/signup" className="underline underline-offset-2">Create an account</Link></p>
      </form>
    </div>
  )
}

