'use client'

import Image from "next/image";
import PaymentCard from "./paymentCard";
import { motion } from "framer-motion";

const PaymentOptions = () => {
    const paymentMethods = [
        { 
            name: "Cash", 
            description: "Easiest way to get reimbursed, strongly recommended", 
            icon: "💵", 
            href: "/payments/cash-octopus" 
        },
        { 
            name: "Octopus Card", 
            description: "Easiest way to get reimbursed, strongly recommended", 
            icon: <Image src="/images/octopus-logo.png" width={50} height={50} alt="Octopus card"/>, 
            href: "/payments/cash-octopus" 
        },
        { 
            name: "Debit/Credit Card", 
            description: "Use your Visa, MasterCard, or Amex.", 
            icon: "💳", 
            href: "/payments/cards" 
        },
        { 
            name: "Mobile Payment Service", 
            description: "AlipayHK, ApplePay, WeChat Pay, PayMe", 
            icon: "📱", 
            href: "/payments/mobile-payment" 
        },
        { 
            name: "Online Purchases", 
            description: "Purchases through online Platforms", 
            icon: "🛒", 
            href: "/payments/online-purchase" 
        },
    ];

    return (
        <div className="flex justify-center min-h-screen">
            <motion.div className="flex flex-col items-center p-6" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-1xl font-bold mt-10 mb-5">BEFORE PURCHASE: Choose Your Payment Method</h1>
                <p className="text-lg font-medium text-gray-600 mb-4">The payment method you choose determines HOW MANY documents you will need to submit later. Please click to read the documents required for each payment method before purchasing.</p>
                <div className="grid md:grid-cols-3 gap-4 p-4 justify-center">
                    {paymentMethods.map((method, index) => (
                        <PaymentCard 
                            key={index} 
                            icon={method.icon} 
                            name={method.name} 
                            description={method.description}
                            href={method.href} 
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default PaymentOptions;