'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClaimantInfo, EventInfo, ReceiptInfo, Receipt, ReimbursementRequest } from '../types';
import ClaimantInfoForm from '../components/claimantInfoForm';
import EventInfoForm from '../components/eventInfoForm';
import ReceiptInfoForm from '../components/receiptInfoForm';
import AdditionalDocsForm from '../components/additionalDocsForm';
import Steppers from '../components/steppers';


const FormsPage = () => {
    const [claimantInfo, setClaimantInfo] = useState<ClaimantInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        uid: '',
    });

    const [eventInfo, setEventInfo] = useState<EventInfo>({
        eventName: '',
        eventDate: '',
        committee: '',
        numOfParticipants: '',
        location: '',
    });

    const [receiptInfo, setReceiptInfo] = useState<ReceiptInfo>({
        totalAmount: '',
        receipts: [],
    });

    const [currentStep, setCurrentStep] = useState(1);

    const formSteps = [
        { label: 'Claimant Information', description: '', remark: ''},
        { label: 'Event Information', description: '', remark: '' },
        { label: 'Receipts Information', description: '', remark: '' },
        { label: 'Additional Documents', description: '', remark: '' },
    ]

    const nextStep = () => {
        if (currentStep < formSteps.length) {
            setCurrentStep(currentStep + 1);
        }
    }

    const previousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    const renderFormPage = () => {
        switch (currentStep) {
            case 1:
                return <ClaimantInfoForm claimantInfo={claimantInfo} onChange={setClaimantInfo} />
            case 2:
                return <EventInfoForm eventInfo={eventInfo} onChange={setEventInfo} />
            case 3:
                return <ReceiptInfoForm receiptInfo={receiptInfo} onChange={setReceiptInfo} />
            case 4:
                return <AdditionalDocsForm receiptInfo={receiptInfo} onChange={setReceiptInfo} />
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex justify-center min-h-screen">
            <motion.div className="w-full max-w-xl p-6 rounded-lg" 
                initial={{ opacity: 0.1 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-2 text-center">Reimbursement Forms</h2>
                <h6 className="mb-6 text-center italic ">*Please submit this form as soon as possible after the event has ended.</h6>
                {/* <Steppers steps={formSteps} /> */}

                {renderFormPage()}

                {currentStep > 1 && (
                    <button
                        className="w-full mt-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => previousStep()}
                    >
                        Previous
                    </button>
                )}

                {currentStep < formSteps.length && (
                    <button
                        className="w-full mt-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => nextStep()}
                    >
                        Next
                    </button>
                )}

                {currentStep === formSteps.length && (
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default FormsPage;
