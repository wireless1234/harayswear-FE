import React from 'react'
import LoginForm from '@/components/auth/LoginForm'
import AuthLeftSide from '@/components/auth/AuthLeftSide'

const LoginPage = () => {
  return (
    <div className='flex h-screen w-full flex-col md:flex-row'>
        <AuthLeftSide />
        <LoginForm />
    </div>
  )
}

export default LoginPage