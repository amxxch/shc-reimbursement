'use client'

import Image from "next/image";
import PaymentCard from "./paymentCard";
import { motion } from "framer-motion";

const PaymentOptions = () => {
    const paymentMethods = [
        { 
            name: "Cash", 
            description: "Easiest way to pay", 
            icon: "💵", 
            href: "/payments/cash-octopus" 
        },
        { 
            name: "Octopus Card", 
            description: "Easiest way to pay", 
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

    const specialBillTypes = [
        { 
            name: "Multiple Payers", 
            description: "Purchases by multiple payers", 
            icon: "👥", 
            href: "/payments/multiple-payers" 
        },
        { 
            name: "Transportation Purchases", 
            description: "Payments for transportation", 
            icon: "🚘", 
            href: "/payments/transportation" 
        },
        { 
            name: "Meals Purchases", 
            description: "Payments for meals", 
            icon: "🍽️", 
            href: "/payments/meals" 
        },
        { 
            name: "Gifts Purchases", 
            description: "Gifts, Gift Certificates, Award, Prizes, Souvenirs", 
            icon: "🎁", 
            href: "/payments/gifts" 
        },
    ];

    return (
        <div className="flex justify-center min-h-screen">
            <motion.div className="flex flex-col items-center p-6" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-1xl font-bold mt-10 mb-5">Choose Your Payment Method</h1>
                <p className="text-lg font-medium text-gray-600 mb-4">Please click to read all required documents for each payment method before making a purchase</p>
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

                <br />
                <h1 className="text-1xl font-bold mt-10 mb-5">Special Purchase Types</h1>
                <p className="text-lg font-medium text-gray-600">If your purchases are in these categories, you will need to provide additional documents on top of the required ones based on your payment methods.</p>
                <div className="grid md:grid-cols-3 gap-4 p-4 justify-center">
                    {specialBillTypes.map((method, index) => (
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