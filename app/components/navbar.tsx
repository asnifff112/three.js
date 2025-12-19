"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-blue-600 font-bold" : "text-white-700";

  return (
    <nav className="w-full p-4 shadow-sm bg-black flex justify-between items-center">
      <h1 className="text-white-600 font-bold">Three js</h1>

      <div className="flex gap-6">
        <Link href="/" className={isActive("/")}>
          Home
        </Link>
        <Link href="/drone" className={isActive("/drone")}>
          drone
        </Link>
         <Link href="/solar" className={isActive("/solar")}>
          solar system
        </Link>

      

       

       

       
       
      </div>
    </nav>
  );
}
