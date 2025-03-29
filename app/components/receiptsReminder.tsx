import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const receiptsReminder = () => {
  return (
    <div className="flex justify-center min-h-screen">
        <motion.div className="flex flex-col items-center p-6" 
            initial={{ opacity: 0.1 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
        >
            <div className='w-full my-10 p-4 rounded-lg shadow-md bg-white cursor-pointer border border-gray-200'>
                <h1 className="text-3xl font-bold mt-5 mb-5">Please keep all original receipts</h1>
                <h2 className="text-2xl text-red-500 font-bold mb-5">We cannot proceed the reimbursement request that does not have original receipts.</h2>
            </div>
            
            <div id='receipts-samples'>
            <h2 className='text-2xl'>Acceptable Receipts</h2>
            <div className="grid md:grid-cols-2 gap-4 p-4 justify-center">
              <Image src="/images/acceptable-receipt-1.png" width={500} height={500} alt="Receipts" />
              <Image src="/images/acceptable-receipt-2.png" width={500} height={500} alt="Receipts" />
            </div>
            
            <h2 className='text-2xl mt-5'>Unacceptable Receipts</h2>
            <div className="grid md:grid-cols-2 gap-4 p-4 justify-center">
              <Image src="/images/unacceptable-receipt-1.png" width={500} height={500} alt="Receipts" />
              <Image src="/images/unacceptable-receipt-2.png" width={500} height={500} alt="Receipts" />
              <Image src="/images/unacceptable-receipt-3.png" width={500} height={500} alt="Receipts" />
              <Image src="/images/unacceptable-receipt-4.png" width={500} height={500} alt="Receipts" />
            </div>
          </div>
        </motion.div>
    </div>
  )
}

export default receiptsReminder
