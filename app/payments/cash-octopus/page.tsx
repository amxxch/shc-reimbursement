'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import PaymentCard from '@/app/components/paymentCard'
import { motion } from 'framer-motion'

const CashInfoPage = () => {
    const requiredDocuments = [
        { icon: '🧾', name: 'Receipts', description: 'Original Receipts' }
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
    <main className="grid min-h-full place-items-center px-6 py-10 sm:py-10 lg:px-8">
      <motion.div className="text-center" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold py-5">Cash and Octopus</h1>

        <hr className="border-2 border-gray-300 my-5" />
        <h1 className='text-sky-800 mt-10'>Required Documents</h1>

        <div className="grid justify-center my-10">
            {requiredDocuments.map((doc, index) => (
                <PaymentCard 
                  key={index} 
                  icon={doc.icon} 
                  name={doc.name} 
                  description={doc.description}
                  onClick={() => navigateToSamples(`${doc.name.toLowerCase()}-samples`)} 
                />
            ))}
        </div>

        <h1 className='mt-20 text-sky-800'>Examples of Acceptable Documents</h1>
        <div id='receipts-samples'>
          <h2 className='text-2xl'>Receipts</h2>
          <div className="grid md:grid-cols-2 gap-4 p-4 justify-center">
            <Image src="/acceptable-receipt-1.png" width={500} height={500} alt="Receipts" />
            <Image src="/acceptable-receipt-2.png" width={500} height={500} alt="Receipts" />
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default CashInfoPage
