'use client'

import React, { useEffect } from 'react'
import { FaFile } from 'react-icons/fa'
import PaymentCard from '@/app/components/paymentCard'
import { motion } from 'framer-motion'

const MobileInfoPage = () => {
    const requiredDocuments = [
        { 
          icon: <FaFile />, 
          name: 'Signed Authorization Letter', 
          description: 'Click to download', 
          href: '/forms/authorization-letter.pdf',
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
          <h1 className="text-5xl font-bold pt-5">Purchases With Multiple Payers</h1>
          <p className="text-xl mt-5">A signed authorization letter should have to be submitted to show consent among all payers</p> 
          <p className="text-xl mb-5">involved in the same claim for the assignment of an individual to serve as the claimant on their behalf.</p>

          <hr className="border-2 border-gray-300 my-5" />
          <h1 className='text-sky-800 mt-10'>Required Documents</h1>
          <div className="flex justify-center my-10">
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
        </motion.div>
      </main>
    )
}

export default MobileInfoPage
