import React from 'react'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import AuthLeftSide from '@/components/auth/AuthLeftSide'

const ForgotPasswordPage = () => {
  return (
    <div className='flex h-screen w-full flex-col md:flex-row'>
        <AuthLeftSide />
        <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPasswordPage