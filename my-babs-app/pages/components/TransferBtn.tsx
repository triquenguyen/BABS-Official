import Image from "next/image"

export default function TransferBt() {
  return (
    <div className="flex p-8 bg-[#69C9D0] bg-opacity-70 rounded-md flex-col items-center justify-center gap-4">
      <Image src="/transfer_icon.svg" width={75} height={100}alt='bg' />
      <button className="">Transfer Funds</button>
    </div>
  )
}