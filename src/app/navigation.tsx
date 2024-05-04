'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation(){
  const urls = [
    {name: 'Main', href: '/'},
    {name: 'Create Event', href: '/event/create'},
    {name: 'Events', href: '/event'}
  ]
  const pathname = usePathname();
    return (
        <div className="navigation flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto flex justify-center">
            {urls.map((url, index) => (
                <Link key={index} href={url.href} className={clsx({'bg-sky-100 text-blue-600': pathname === url.href })}>
                  {url.name}
                </Link>)
            )}
          </div>
        </div>
    );
}