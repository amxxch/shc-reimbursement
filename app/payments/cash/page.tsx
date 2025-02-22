'use client'

import PaymentCard from '@/app/components/paymentCard'
import React from 'react'

const CashInfoPage = () => {
    const requiredDocuments = [
        { icon: '🧾', name: 'receipts', description: 'valid receipts'}
    ]
  return (
    <main className="grid min-h-full place-items-center px-6 py-10 sm:py-10 lg:px-8">
      <div className="text-center">
        <h1>Required Documents</h1>

        <div className="grid md:grid-cols-4 gap-4 p-4 justify-center">
            {requiredDocuments.map((doc, index) => (
                // can be the click for more info card
                <PaymentCard key={index} icon={doc.icon} name={doc.name} description={doc.description} href={'/'}/>
            ))}
        </div>
      </div>
    </main>
  )
}

export default CashInfoPage
