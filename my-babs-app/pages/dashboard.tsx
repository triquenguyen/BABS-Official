import { useSession, signOut } from 'next-auth/react';
import Router from 'next/router';
import loadConfig from "next/dist/server/config";

export default function dashboard() {
  const { status, data:session } = useSession();


  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <h1>Dashboard {session.user?.email} {status}</h1>
      <p>{session.user?.name}</p>
      <button className="px-3 py-2 bg-[#69C9D0] rounded-md text-white w-[25%]" onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

