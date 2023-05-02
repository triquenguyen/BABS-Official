"use client"

import { FormEventHandler, useState } from "react"
import { getSession, signIn, useSession } from "next-auth/react"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from "next/router"
import { headers } from "next/dist/client/components/headers"

interface FormProps {
  pincode: string
}

const initialForm: FormProps = {
  pincode: ''
}

export default function PINCodeForm({ callbackUrl = '/atm/dashboard' }) {
  const router = useRouter()
  const { data, update } = useSession();
  const [form, setForm] = useState<FormProps>(initialForm)
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  if (data?.user.pincode)
  {
    router.push(callbackUrl)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    update({pincode: form.pincode}).then(session => {
      console.log(session);
      if (session?.user.pincode)
      {
        router.push(callbackUrl);
      }
    })
    // try {
    //   const res = await axios.post('/api/atm/pincode', form, {
    //     headers: {
    //       Authorization: `Bearer ${data.accessToken}`
    //     }
    //   })
    //   if (!res.data.success) {
    //     setErrorMessage(res.data.message);
    //     console.log(errorMessage);
    //   }
    //   else {
    //     setErrorMessage('')
    //     setForm(initialForm)
    //     router.push(callbackUrl)
    //   }
    // } catch (error) {
    //   console.log("Error submitting form", error)
    // }
  }

  return (
    <div className="flex flex-col items-center gap-[24px] w-[80%]">
      <h1 className="text-[42px] font-bold text-[#69C9D0] mt-[8px]">PIN Code</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[28px] items-center ">
        <label className="text-[#69C9D0] flex flex-col">
          PIN
          <input type="password" name="pincode" value={form.pincode} onChange={handleChange} className="bg-[rgba(255,255,255,0.2)] w-[24em] border-[2px] border-[rgba(0,0,0,0)] focus:ring-[#69C9D0] focus:border-[#69C9D0] focus:outline-none text-sm rounded-lg block p-3 mt-2" />
        </label>
        {errorMessage && <p className="text-[#FF0000] flex flex-col">{errorMessage}</p>}
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]">Login</button>
      </form>
    </div>
  )
}

