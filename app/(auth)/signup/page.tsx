import React from 'react'
import SignUpForm from '@/components/auth/SignUpForm'
import AuthLeftSide from '@/components/auth/AuthLeftSide'

const SignUp = () => {
  return (
    <div className='flex h-screen w-full flex-col md:flex-row'>
      <AuthLeftSide />
      <SignUpForm />
    </div>
  )
}

export default SignUp