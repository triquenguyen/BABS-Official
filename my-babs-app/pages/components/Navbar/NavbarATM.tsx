import Link from "next/link"
import Image from "next/image"
import ProfileBtn from "../Profile/ProfileBtn"

export type NavItem = {
  name: string
  active: boolean
}

export default function NavbarATM({ username, navItems, setNavItems }) {
  const handleClick = (index: number) => {
    const newNavItems = navItems.map((item: NavItem, i: number) => ({
      ...item,
      active: i === index,
    }));
    setNavItems(newNavItems);
  };
  return (
    <nav className="md:container md:mx-auto">
      <div className="flex items-center justify-items-center">
        <Link href="#" className="flex-none"><img className="flex-none" src="/babs-logo.svg" alt="logo" width={200} height={50} /></Link>
        <div className="w-full md:block md:w-auto md:mx-auto">
          <ul className="list-style-none mx-auto flex flex-row pl-0">
            {navItems.map((item: NavItem, index) => (
              <li
                key={index}
                className={"mx-4 text-2xl font-medium cursor-pointer " + (item.active ? 'text-[#519BA1] ' : 'text-[#FFFFFF] ')}
                onClick={() => handleClick(index)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 ml-auto items-center">
          <h1 className='text-[#080325]'>Welcome back <div className="font-bold text-[#080325]">{username}</div></h1>
        </div>
      </div>
    </nav>
  )
}

// import Link from 'next/link'

// export default function Navbar() {
//   return (
//     <nav className="py-5 bg-[#080325]" >
//       <Link href="/accounts" className="px-3 text-[#519BA1]">Accounts</Link>
//       <Link href="/transfer" className="px-3 text-white">Transfer</Link>
//       <Link href="/settings" className="px-3 text-white">Settings</Link>
//       <Link href="/support" className="px-3 text-white">Support</Link>
//     </nav>
//   )
// }
