"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { cn } from "./lib/utils";

const links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issues",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex space-x-6 border-b px-5 mb-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug size={25} />
      </Link>
      <ul className="flex items-center gap-x-4">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className={cn(
                "text-zinc-500 hover:text-zinc-800 transition-colors",
                {
                    "text-zinc-800 font-[500]" : pathname === href
                }
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
