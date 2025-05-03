import React, { Suspense } from 'react'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import AuthLeftSide from '@/components/auth/AuthLeftSide'

const ResetPasswordPage = () => {
  return (
    <div className='flex h-screen w-full flex-col md:flex-row'>
        <AuthLeftSide />
        <Suspense fallback={<div className="flex items-center justify-center w-full h-screen text-white">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
    </div>
  )
}

export default ResetPasswordPage