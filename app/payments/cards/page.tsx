'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import PaymentCard from '@/app/components/paymentCard'
import { FaHistory } from 'react-icons/fa'
import { motion } from 'framer-motion'

const CardInfoPage = () => {
  const requiredDocuments = [
    { 
      icon: '🧾', 
      name: 'Receipts', 
      description: 'Original Receipts'
    },
    { 
      icon: <FaHistory />, 
      name: 'Transaction History', 
      description: 'All relevant transaction(s) history with the bank account number',
    },
    { icon: '💳', 
      name: 'Card Photo', 
      description: 'Card photo with the name of the card holder on the card'
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const navigateToSamples = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  }

  return (
    <main className="grid min-h-full place-items-center text-center px-6 py-10 sm:py-10 lg:px-8">
      <motion.div className="text-center" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold py-5">Credit / Debit Card</h1>

        <hr className="border-2 border-gray-300 my-5" />
        <h1 className='text-sky-800 mt-10'>Required Documents</h1>

        <div className="grid md:grid-cols-3 gap-4 justify-center my-10">
            {requiredDocuments.map((doc, index) => (
                <PaymentCard 
                  key={index} 
                  icon={doc.icon} 
                  name={doc.name} 
                  description={doc.description} 
                  onClick={() => navigateToSamples(`${doc.name.toLowerCase().replace(' ', '-')}-samples`)}
                />
            ))}
        </div>

        <h1 className='mt-20 text-sky-800'>Examples of Acceptable Documents</h1>
        <div id='receipts-samples' className='my-10'>
          <h2 className='text-2xl'>Receipts</h2>
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

        <div id='transaction-history-samples' className='my-10'>
          <h2 id='card-photo-samples' className='text-2xl mb-5'>Transaction History and Card Photo</h2>
          <div className='flex justify-center'>
            <Image className="flex justify-center" src="/images/card-transaction.png" width={500} height={500} alt="Transaction History" />
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default CardInfoPage
