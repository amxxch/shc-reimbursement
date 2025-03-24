'use client';

import React from 'react';
import { motion } from "framer-motion";
import { Steps } from '../types';

interface StepperProps {
    steps: Steps[],
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const Steppers = ({steps, activeStep, setActiveStep } : StepperProps) => {

    return (
        <div>
            <ul className="steps steps-vertical lg:steps-horizontal items-center lg:items-start lg:justify-center">
            {steps.map((step, index) => (
                <li
                    key={index}
                    className={`step items-center lg:items-start text-center lg:text-left 
                        ${activeStep >= index ? 'step-neutral' : 'text-gray-400'} 
                        transition-colors duration-300`}
                    onClick={() => setActiveStep(index)}
                >
                    <motion.div className={`text-left lg:text-center p-2 
                        ${activeStep >= index ? 'border-sky-300' : 'border-gray-300'}`}
                        initial={{ opacity: 0.5, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <span className={`text-xl ${activeStep === index ? 'font-bold text-base-600' : ''}`}>
                            {step.label}
                        </span>
                        <br />
                        <span className="text-md text-gray-600">{step.description}</span>
                        <br />
                        {step.remark && <span className="text-md text-gray-500 italic">{step.remark}</span>}
                    </motion.div>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Steppers
