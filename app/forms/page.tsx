'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ClaimantInfo, EventInfo, ReceiptInfo, Receipt, ReimbursementRequest } from '../types';
import ClaimantInfoForm from '../components/claimantInfoForm';
import EventInfoForm from '../components/eventInfoForm';
import ReceiptInfoForm from '../components/receiptInfoForm';
import AdditionalDocsForm from '../components/additionalDocsForm';
import Steppers from '../components/steppers';
import FormButton from '../components/formButton';


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

                {currentStep === 1 && 
                <ClaimantInfoForm 
                    claimantInfo={claimantInfo} 
                    onChange={setClaimantInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                />}
                {currentStep === 2 && 
                <EventInfoForm 
                    eventInfo={eventInfo} 
                    onChange={setEventInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                />}
                {currentStep === 3 && 
                <ReceiptInfoForm 
                    receiptInfo={receiptInfo} 
                    onChange={setReceiptInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                />}
                {currentStep === 4 && 
                <AdditionalDocsForm 
                    receiptInfo={receiptInfo} 
                    onChange={setReceiptInfo} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                    handleSubmit={handleSubmit}
                />}
            </motion.div>
        </div>
    );
};

export default FormsPage;
