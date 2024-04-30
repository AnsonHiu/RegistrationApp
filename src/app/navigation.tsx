'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation(){
  const urls = [
    {name: 'Main', href: '/'},
    {name: 'Create Event', href: '/event/create'}
  ]
  const pathname = usePathname();
    return (  
        <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm flex">
              {urls.map((url, index) => (
                  <Link href={url.href} className={clsx({ 'bg-sky-100 text-blue-600': pathname === url.href })}>
                    {url.name}
                  </Link>)
              )}
            </div>
          </div>
        </div>
    );
}