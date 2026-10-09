'use client'
import { useEffect, useState } from "react";
import { Link, Button } from "@heroui/react";
import { signOut, useSession } from "../lib/auth-client";
import baseUrl from "../servicesApi/baseUrl";
const Navbar = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
const [categories,setCategories] = useState([])
      const {data:session,isPending} = useSession()

// if(isPending){
//   return <span className="loading loading-spinner text-success"></span>

// }
const authLinks=<>
 {
    session?.user?<>
    <span  className="flex font-bold items-center gap-2 whitespace-nowrap text-sm text-slate-600 transition-colors hover:text-blue-600">Welcome {session?.user.name}</span>
   <Link href="/sign-in"> <button className="btn btn-success" onClick={() =>signOut()}>Sign Out</button></Link>
    </>:<> <Link href="/sign-in">Login</Link>
          <Link href="/sign-up"><Button>Sign Up</Button></Link></>
 }
</>

useEffect(()=>{
    fetch(`${baseUrl}/api/categories`)
    .then(res=>res.json())
    .then(data=>setCategories(data))
    .catch(error=>{
        alert(error.message)
    })
},[])
console.log(categories)

const links=<>
<Link href="/">
<li className="flex text-xl items-center gap-2 whitespace-nowrap text-sm text-slate-600 transition-colors hover:text-blue-600">Home</li>
</Link>
{
    categories.map(ct=> <li key={ct?._id}>
      <Link
        href={`/categories/${ct?.slug}`}
        className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-600 transition-colors hover:text-blue-600"
      >
        <span className="text-base text-xl">{ct?.icon}</span>
        <span className="text-xl">{ct?.name}</span>
      </Link>
    </li>)
}
         
</>
if(isPending){
  return <span className="loading loading-spinner  text-center text-success"></span>

}
    return (
        <div>
             <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-[1880px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
           
           <Link href="/"> <p className="font-bold">TechPulse</p></Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
         {links}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
        {authLinks}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
           {links}
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {authLinks}
            </li>
          </ul>
        </div>
      )}
    </nav>
        </div>
    );
};

export default Navbar;