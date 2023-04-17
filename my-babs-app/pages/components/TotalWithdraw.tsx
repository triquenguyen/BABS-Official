"use client"

export default function TotalWithdraw({ amount }) {
  return (
    <div className="w-[25%] h-[5%]">
      <h1>Available Balance</h1>
      <h2>${amount}</h2>
    </div>
  )
}