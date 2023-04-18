import Image from "next/image"
import { useState } from "react"
import Form from "./components/LoginForm"
import Link from "next/link"

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src="/login-bg.svg" alt="Logo" width={1000} height={1000} className="hidden fixed xl:block w-[100%] z-[-1] min-h-screen"/>
        <div className="py-10 px-14 bg-[#080325] bg-opacity-70 rounded-xl z-[1] flex items-center justify-center flex-col">
          <Link href="/"><Image src="/babs-logo.svg" alt="logo" width={200} height={50}/></Link>
          <Form />
        </div>
    </div>
  )
}