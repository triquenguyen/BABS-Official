import Image from "next/image";
import Link from "next/link";
import PINCodeForm from "../components/PINCodeForm";

export default function PINCode() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src="/login-bg.svg" alt="Logo" width={1000} height={1000} className="hidden fixed xl:block w-[100%] z-[-1]" />
      <div className="w-[30%] h-[80%] bg-[#080325] bg-opacity-70 rounded-2xl z-[1] flex items-center justify-center flex-col">
        <Link href="/"><Image src="/babs-logo.svg" alt="logo" width={200} height={50} /></Link>
        <PINCodeForm callbackUrl="/atm/dashboard" />
      </div>
    </div>
  )
}

PINCode.auth=true