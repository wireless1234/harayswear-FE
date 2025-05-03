"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { activateEmail } from '@/lib/authApi'
import { CustomErrorResponse } from '@/types/error'

const ActivateEmail = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token') || ''
  const uidb64 = searchParams.get('uid') || ''

  const mutation = useMutation({
    mutationFn: ({ token, uidb64 }: { token: string; uidb64: string }) =>
      activateEmail({ uidb64, token }),
    mutationKey: ['activateEmail'],
    onSuccess: () => {
      toast.success('Email activated successfully')
      router.push('/login')
    },
    onError: (error: AxiosError<CustomErrorResponse>) => {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    },
  })

  useEffect(() => {
    if (!token || !uidb64) {
      toast.error('Invalid activation link')
      return
    }

    if (mutation.isIdle) {
        mutation.mutate({ token, uidb64 })
    }
  }, [token, uidb64, mutation.isIdle])

  if (!token || !uidb64) return null

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6">
        Activating Email...
      </h1>
      <p className="text-center text-sm sm:text-base">
        Please wait while we activate your email.
      </p>
      <div className="flex justify-center items-center mt-4">
        {mutation.isPending && <span className="loader"></span>}
        {mutation.isError && (
          <p className="text-red-500">Activation failed. Please try again.</p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-500">Email activated successfully!</p>
        )}
      </div>
    </div>
  )
}

export default ActivateEmail
