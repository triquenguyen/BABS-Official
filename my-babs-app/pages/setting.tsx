import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Router from "next/router"

export default function Setting() {

  const { data: session, status } = useSession()

  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <h1>User Profile</h1>
    </div>
  )
}