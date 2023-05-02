import { IBM_Plex_Mono } from "next/font/google"

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400"
})

export default function TransactionCard({ type, amount, id, date, balanceBefore, balanceAfter, receiver, sender }) {
  if (type == "Transfer" && receiver != null) {
    return (
      <div className={`flex  flex-col text-white bg-[#69C9D0] p-4 gap-2 items-center justify-center rounded-md`}>
        <div className="flex gap-6">
          <h1>{type}</h1>
          <h1>{id}</h1>
          <h1 className={`${plexMono.className}`}>$ {amount}</h1>
          <h1>{date}</h1>
          <h1 className={`${plexMono.className}`}>$ {balanceBefore}</h1>
          <h1 className={`${plexMono.className}`}>$ {balanceAfter}</h1>
        </div>

        <h1>Send to {receiver}</h1>
      </div>
    )
  } else if (type == "Transfer" && sender != null) {
    return (
      <div className={`flex  flex-col text-white bg-[#69C9D0] p-4 gap-2 items-center justify-center rounded-md`}>
        <div className="flex gap-6">
          <h1>{type}</h1>
          <h1>{id}</h1>
          <h1 className={`${plexMono.className}`}>$ {amount}</h1>
          <h1>{date}</h1>
          <h1 className={`${plexMono.className}`}>$ {balanceBefore}</h1>
          <h1 className={`${plexMono.className}`}>$ {balanceAfter}</h1>
        </div>

        <h1>Send from {sender}</h1>
      </div>
    )
  } else {
    return (
      <div className="flex text-white bg-[#69C9D0] gap-8 p-4 items-center justify-center rounded-md ">
        <h1>{type}</h1>
        <h1>{id}</h1>
        <h1 className={`${plexMono.className}`}>$ {amount}</h1>
        <h1>{date}</h1>
        <h1 className={`${plexMono.className}`}>$ {balanceBefore}</h1>
        <h1 className={`${plexMono.className}`}>$ {balanceAfter}</h1>
      </div>
    )
  }
}
