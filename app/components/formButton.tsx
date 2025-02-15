import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface FormButtonProps {
    currentStep: number;
    setCurrentStep: (n: number) => void;
    handleNextStep?: (e: React.FormEvent) => void;
    handleSubmit?: (e: React.FormEvent) => void;
}

const FormButton = ({ 
    currentStep, 
    setCurrentStep, 
    handleSubmit = () => {}, 
    handleNextStep = () => {},
} : FormButtonProps) => {


    const handlePreviousStep = () => {
        setCurrentStep(Math.max(currentStep - 1, 1));
    }

  return (
    <div className="flex justify-between mt-8">

        {currentStep > 1 && (
            <button
                className="flex px-4 py-2 items-center bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handlePreviousStep}
            >
                <FaArrowLeft className="mr-2" />
                Previous
            </button>
        )}

        <div className="flex-grow" />

        {currentStep < 4 && (
            <button
                className="flex px-4 py-2 items-center bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={(e) => {
                    handleNextStep(e);
                }}
            >
                Next
                <FaArrowRight className="ml-2" />
            </button>
        )}

        {currentStep === 4 && (
            <button
                type="submit"
                className="flex px-4 py-2 items-center bg-green-400 text-white font-semibold rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={handleSubmit}
            >
                Submit
            </button>
        )}
    </div>
  )
}

export default FormButton
