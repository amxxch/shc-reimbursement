import { motion } from 'framer-motion'
import React from 'react'

const goToForm = () => {

    const navigateToForm = () => {
        window.location.href = '/forms'
    }

    return (
        <div className="flex justify-center min-h-screen">
            <motion.div className="flex flex-col items-center p-6" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-1xl font-bold mt-10 mb-5">Fill in the reimbursement forms</h1>
                
                <button
                    className="flex px-6 py-2 mt-4 items-center bg-sky-600 text-white text-lg font-semibold rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    onClick={navigateToForm}
                >
                    Go to Forms
                </button>
            </motion.div>
        </div>
    )
}

export default goToForm
