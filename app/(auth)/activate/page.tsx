import React, { Suspense } from 'react'
import ActivateEmail from '@/components/auth/ActivateEmail'


const ActivateEmailPage = () => {
  return (
    <div>
        <Suspense fallback={<div className="flex items-center justify-center h-screen w-full">Loading...</div>}>
            <ActivateEmail />
        </Suspense>
    </div>
  )
}

export default ActivateEmailPage