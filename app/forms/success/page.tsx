import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const FormSuccessfulPage = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <Image src="/images/success-icon.png" alt="Success" width={150} height={150} />
        </div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900">Your reimbursement request is received.</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          It should take 4-6 weeks for payment processing. <br /> 
          For inquires, please contact ...
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link href='/' className="rounded-md bg-sky-600 mt-15 px-3.5 py-2.5 text-base font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Go back home
          </Link>
        </div>
        
      </div>
    </main>
  )
}

export default FormSuccessfulPage