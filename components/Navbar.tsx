import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'
import { signOut } from 'next-auth/react'
import ProfileMenu from './ProfileMenu'

const Navbar = async () => {
    const session = await getCurrentUser();
  return (
    <nav className='flex justify-between items-center navbar py-5 px-8 border-b border-nav-border gap-4'>
        <div className='flex-1 flex justify-start items-center gap-10'>
            <Link href="/">
                <Image src="/logo.svg"
                width={115}
                height={43}
                alt='Flexibble'
                />
            </Link>
            <ul className='xl:flex hidden text-small gap-7'>
                {NavLinks.map((link)=> (
                    <Link href={link.href} key={link.key}>
                        {link.text}
                    </Link>
                ))}
            </ul>
           
        </div>
        <div className='flex justify-center items-center gap-4'>
            {/* only if user exists */}

                {session?.user ? (
                    <>
                    {/* This will be extracted so that Navbar will be SSR */}
                    {/* <button className='text-sm' onClick={signOut}>Sign Out</button> */}
                    
                    <ProfileMenu session={session} />
                    
                    <Link href="/create-project">
                    Share work
                    </Link>

                    </> 
                ) : (<AuthProviders/>)
            }
            </div>
    </nav>
  )
}

export default Navbar