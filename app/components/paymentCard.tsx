import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Url } from 'url'

interface Props {
    icon: any,
    name: String,
    description: string,
    href: Url
}

const PaymentCard = ({ icon, name, description, href }: Props) => {
  return (
    <motion.div
        className={`w-full max-w-xs p-4 rounded-lg shadow-md bg-white cursor-pointer border border-gray-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <Link href={href} >
            <div className="text-3xl">{icon}</div>
            <h3 className="text-lg font-bold mt-2">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </Link>
    </motion.div>
  )
}

export default PaymentCard
