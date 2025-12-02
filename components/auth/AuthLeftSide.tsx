import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthLeftSide = () => {
  return (
    <section className='w-full md:w-5/12 bg-cover bg-center'>
        <div className='flex flex-col items-center justify-center h-full p-4 md:p-0'>
          <Link href='/'>
            <Image
                src='/images/logo.webp'
                alt='logo'
                width={100}
                height={100}
            />
          </Link>
        {/* <h1 className='text-3xl font-bold text-white'>Welcome Back</h1>
        <p className='text-white'>Login to your account</p> */}
        </div>
    </section>
  )
}

export default AuthLeftSide