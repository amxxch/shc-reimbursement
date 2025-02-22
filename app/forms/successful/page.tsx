import React from 'react'

const FormSuccessfulPage = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-xl font-semibold text-green-600">Green Tick</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900">Your reimbursement forms are received.</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">The reimbursement process should take 4-6 weeks. For inquires, please contact ฉัน</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/" className="rounded-md bg-sky-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
        </div>
      </div>
    </main>
  )
}

export default FormSuccessfulPage