import axios from 'axios'
import { FormEventHandler, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface DepositProps {
  amount: number
  id: number
}

const initialDeposit: DepositProps = {
  amount: 0,
  id: 0
}

export default function DepositCheck({ id }) {
  const [form, setForm] = useState<DepositProps>(initialDeposit)

  useEffect(() => {
    if (id) {
      setForm({ ...form, id: id })
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDeposit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await axios.post('/api/deposit', form)

    if (res.status === 200) {
      console.log('deposit successful')
    }
  }

  return (
    <div className="">
      <form onSubmit={handleDeposit}>
        <label>
          Amount to Deposit
          <input type="number" placeholder='0' value={form.amount} name='amount' onChange={handleChange} />
        </label>
        <button type="submit" className="px-3 py-2 bg-[#69C9D0] rounded-md text-white">Deposit</button>
      </form>
    </div>
  )
}