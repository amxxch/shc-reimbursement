'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaFile, FaHistory } from 'react-icons/fa'
import PaymentCard from '@/app/components/paymentCard'
import { motion } from 'framer-motion'

const MobileInfoPage = () => {
    const requiredDocuments = [
        { 
          icon: '🧾', 
          name: 'Receipts', 
          description: 'Original Receipts', 
        },
        { 
          icon: <FaFile />, 
          name: 'Declaration Form', 
          description: 'Click to download', 
          href: '/forms/declaration-form.pdf',
          isDownload: true
        },
        { 
          icon: <FaHistory />, 
          name: 'Transaction History', 
          description: 'A screenshot of transaction history (For payment with card only)', 
        },
        { 
          icon: '💳', 
          name: 'Card Photo', 
          description: 'Card photo with the name of the card holder on the card (For payment with card only)', 
        },
        { 
          icon: '🧾', 
          name: 'Transaction Receipt', 
          description: 'A screenshot of transaction history (For payment with balance only) ', 
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
      <main className="grid min-h-full place-items-center px-6 py-10 sm:py-10 lg:px-8">
      <motion.div className="text-center" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
      >
          <h1 className="text-5xl font-bold pt-5">Mobile Payments</h1>
          <p className="text-xl my-5">Including Apple Pay, AliPay, Wechat Pay, and PayMe</p>

          <hr className="border-2 border-gray-300 my-5" />
          <h1 className='text-sky-800 mt-10'>Required Documents</h1>
          <div className="grid md:grid-cols-3 gap-4 justify-center my-10">
            {requiredDocuments.map((doc, index) => (
                  <PaymentCard 
                    key={index} 
                    icon={doc.icon} 
                    name={doc.name} 
                    description={doc.description} 
                    href={doc.href ? doc.href : ''}
                    isDownload={doc.isDownload ? doc.isDownload : false}
                    onClick={() => navigateToSamples(`${doc.name.toLowerCase().replace(' ', '-')}-samples`)}
                  />
              ))}
          </div>

          <h1 className='mt-20 text-sky-800'>Examples of Acceptable Documents</h1>

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

          <div id='transaction-history-samples' className='my-10'>
            <h2 id='card-photo-samples' className='text-2xl'>Transaction History and Card Photo</h2>
            <h2 className='text-2xl mb-5'>(For payment with card)</h2>
            <div className='flex justify-center'>
              <Image className="flex justify-center" src="/images/card-transaction.png" width={500} height={500} alt="Transaction History" />
            </div>
          </div>

          <div id='transaction-receipt-samples' className='my-10'>
            <h2 className='text-2xl'>Transaction Receipt</h2>
            <h2 className='text-2xl mb-5'>(For payment with balance)</h2>
            <div className='flex justify-center'>
              <Image className="flex justify-center" src="/images/transaction-receipt.png" width={500} height={500} alt="Transaction Receipt" />
            </div>
          </div>
        </motion.div>
      </main>
    )
}

export default MobileInfoPage
