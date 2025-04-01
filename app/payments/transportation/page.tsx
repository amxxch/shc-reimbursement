'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaFile, FaPen } from 'react-icons/fa'
import PaymentCard from '@/app/components/paymentCard'
import { motion } from 'framer-motion'

const MobileInfoPage = () => {
    const requiredDocuments = [
        { 
          icon: '🧾', 
          name: 'Receipts (If available)', 
          description: 'Original Receipts must be obtained when using transportation with receipt issued to passengers', 
        },
        { 
          icon: <FaPen />, 
          name: 'Transportation Report', 
          description: 'A Word document with Date, Pick up point and Destination, and Purpose of Journey (Submit as a PDF file)', 
        },
        { 
          icon: <FaFile />, 
          name: 'Transportation Expenses Form', 
          description: 'For transportation with standard rate available but without receipts, such as bus, tram, or MTR only (Click to download)', 
          href: '/forms/transportation-expenses.pdf',
          isDownload: true
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
          <h1 className="text-5xl font-bold pt-5">Transportation Purchases</h1>
          <p className="text-xl my-5">**Taxis should be used only if no other cheaper form of transport was available or practicable, <br />or deemed more economical when accompanied by other participants/leaders.</p>

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
            <div className="flex mt-4 gap-4 p-4 justify-center">
              <Image src="/images/uber-receipt.png" width={500} height={500} alt="Receipts" />
            </div>
          </div>
        </motion.div>
      </main>
    )
}

export default MobileInfoPage
