'use client'

import Image from "next/image";
import PaymentCard from "./paymentCard";

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
        { 
            name: "TaoBao", 
            description: "Online purchases through TaoBao", 
            icon: <Image src="/images/taobao-logo.png" width={35} height={50} alt="Taobao"/>, 
            href: "/payments/taobao" 
        },
    ];

    return (
        <div className="flex flex-col items-center p-6">
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
        </div>
    );
}

export default PaymentOptions;