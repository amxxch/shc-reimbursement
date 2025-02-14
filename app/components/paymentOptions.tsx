'use client'

import { motion } from "framer-motion";
import { FaCreditCard, FaCashRegister } from "react-icons/fa";
import PaymentCard from "./paymentCard";

const PaymentOptions = () => {
    const paymentMethods = [
        { 
            name: "Bank Transfer", 
            description: "Fast & secure payment via online banking.", 
            icon: "🏦", 
            href: "/payments" 
        },
        { 
            name: "Credit Card", 
            description: "Use your Visa, MasterCard, or Amex.", 
            icon: <FaCreditCard />, 
            href: "/payments" 
        },
        { 
            name: "Mobile Wallet", 
            description: "Pay using Line Pay, TrueMoney, or PromptPay.", 
            icon: "📱", 
            href: "/payments" 
        },
        { 
            name: "Cash", 
            description: "Manual payment at our office.", 
            icon: "💵", 
            href: "/payments/cash" 
        }
    ];

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-1xl font-bold my-10">Choose Your Payment Method</h1>

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