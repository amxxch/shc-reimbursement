import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Url } from 'url'

interface PaymentCardProps {
    icon: any,
    name: string,
    description: string,
    href?: Url | string,
    isDownload?: boolean,
    onClick?: () => void
}

const PaymentCard = ({ icon, name, description, href, isDownload = false, onClick }: PaymentCardProps) => {
  const content = (
    <>
      <div className="flex justify-center text-3xl h-8">{icon}</div>
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </>
  )
  return (
    <motion.div
        className={`w-full max-w-xs p-4 rounded-lg shadow-md bg-white cursor-pointer border border-gray-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
      <div onClick={onClick}>
        { href ? (
          isDownload ? (
            <a href={href} download>
              {content}
            </a>
          ) : (
            <Link href={href} >
                {content}
            </Link>
          )
        ) : (
          <div>
            {content}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PaymentCard
